const jwt = require('jsonwebtoken');

class Jwt {
  constructor() {
    this.expire = 60 * 15;
    this.timeToRegenerate = 5;
    this.jwtSecret = process.env.JWT_APP_SECRET;
    this.validUntil;
  }

  getToken(context) {
    this.validUntil = new Date();
    this.validUntil.setSeconds(this.validUntil.getSeconds() + this.expire);

    return jwt.sign(
      {
        exp: this.validUntil.getTime(),
        audience: context,
      },
      this.jwtSecret
    );
  }

  verifyToken(token, context) {
    token = token.replace('Bearer ', '');

    try {
      const data = jwt.verify(
        token,
        this.jwtSecret,
        {
          maxAge: this.expire,
        }
      );

      if (data.audience !== context) {
        return false;
      }

      const diffTime = this.diffMinutes(data.exp);
      if (diffTime <= this.timeToRegenerate) {
        token = this.getToken(context);
      }
    } catch (err) {
      return false;
    }

    return token;
  }

  diffMinutes(expire) {
    const diff = (expire - Date.now()) / 1000;
    return Math.abs(Math.round(diff / 60));
  }

  getDateLocaleString() {
    return this.validUntil.toLocaleString('pt-BR');
  }
}

module.exports = new Jwt();
