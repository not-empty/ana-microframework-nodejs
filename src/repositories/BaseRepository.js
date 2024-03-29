import { createConnection } from 'mysql';
import { ulid } from 'ulid';
import { filters } from '#src/config/filterType.js';

class BaseRepository {
  constructor(table) {
    this.table = table;

    this.connection = createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    this.maxAmountRows = 25;
  }

  getById(id) {
    return this.execSingleQuery(
      `
        SELECT
          *
        FROM
          ${this.table}
        WHERE
          id = ?
          AND deleted IS NULL
      `, [id]
    );
  }

  getDeadById(id) {
    return this.execSingleQuery(
      `
        SELECT
          *
        FROM
          ${this.table}
        WHERE
          id = ?
          AND deleted IS NOT NULL
      `,
      [id]
    );
  }

  get(fields = '*', page = 1, order = 'id', classOrder = 'asc', filter = {}) {
    const offset = this.maxAmountRows * (page - 1);
    const { conditions, values } = this.applyFilters(filter);

    return this.execQuery(
      `
        SELECT
          ${fields}
        FROM
          ${this.table}
        WHERE
          deleted IS NULL
          ${conditions}
        ORDER BY ${order} ${classOrder}
        LIMIT ${this.maxAmountRows} OFFSET ${offset}
      `,
      values
    );
  }

  getDead(fields = '*', page = 1, order = 'id', classOrder = 'asc', filter = {}) {
    const offset = this.maxAmountRows * (page - 1);
    const { conditions, values } = this.applyFilters(filter);

    return this.execQuery(
      `
        SELECT
          ${fields}
        FROM
          ${this.table}
        WHERE
          deleted IS NOT NULL
          ${conditions}
        ORDER BY ${order} ${classOrder}
        LIMIT ${this.maxAmountRows} OFFSET ${offset}
      `, values
    );
  }

  bulk(ids) {
    const statement = Array(ids.length).fill('?');
    return this.execQuery(
      `
        SELECT
          *
        FROM
          ${this.table}
        WHERE
          id IN(
            ${statement.join(',')}
          )
          AND deleted IS NULL
      `,
      ids
    );
  }

  delete(id) {
    return this.execQuery(
      `
        UPDATE
          ${this.table}
        SET
          deleted = CURRENT_TIMESTAMP()
        WHERE
          id = ?
      `,
      [id]
    );
  }

  async update(id, params) {
    const sql = `
      UPDATE
        ${this.table}
      SET
        ?
      WHERE id = ?
    `;

    await this.execQuery(
      sql,
      [params, id]
    );

    return params.id;
  }

  async insert(params) {
    if (typeof params.id === 'undefined') {
      params.id = ulid();
    }

    const fields = Object.keys(params).join(',');
    const value = [
      [Object.values(params)],
    ];

    const sql = `
      INSERT INTO ${this.table} (
        ${fields}
      ) VALUES ?
    `;
    await this.execQuery(sql, value);

    return params.id;
  }

  applyFilters(filterData) {
    let conditions = '';
    const values = [];

    Object.entries(filterData).forEach(([ key, value ]) => {
      const operator = this.getOperator(value.type);

      conditions += ` AND ${key} ${operator} ?`;

      if (value.type == filters.FILTER_LIKE) {
        values.push(`%${value.data}%`);
        return;
      }

      values.push(value.data);
    });

    return {
      conditions: conditions,
      values: values,
    }
  }

  getOperator(type) {
    const key = Object.keys(filters.FILTER_TYPE_MAP).find(key => filters[key] === type);
    return filters.FILTER_TYPE_MAP[key];
  }

  verifyConnection() {
    return new Promise((res, rej) => {
      if (this.connection.state !== 'disconnected') {
        res(true);
      }

      this.connection.connect((err) => {
        if (err) {
          rej(err);
        }

        res(true);
      });
    });
  }

  async execQuery(query, params = []) {
    await this.verifyConnection();

    return new Promise((res, rej) => {
      this.connection.query(query, params, (error, results) => {
        if (error) {
          rej(error);
        }

        res(JSON.parse(JSON.stringify(results)));
      });
    });
  }

  async execSingleQuery(query, params = []) {
    await this.verifyConnection();

    return new Promise((res, rej) => {
      this.connection.query(query, params, (error, results) => {
        if (error) {
          rej(error);
        }

        res(JSON.parse(JSON.stringify(results[0] || {})));
      });
    });
  }
}

export { BaseRepository };
