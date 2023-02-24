const ULID = require('ulid');

class Response {
  constructor() {
    this.start = (new Date()).getMilliseconds();
  }

  send(token, data = [], message = '') {
    const end = (new Date()).getMilliseconds();
    let profiler = end - this.start;
    if (profiler < 0) {
      profiler = 0;
    }

    const response = {
      data: data,
      profiler: profiler,
      token: token,
      requestId: ULID.ulid(),
    };

    if (message.length > 0) {
      response.message = message;
    }

    return response;
  }
}

module.exports = Response;
