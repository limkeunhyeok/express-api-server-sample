class Response {
  constructor(success) {
    this.success = success;
    this.response = null;
    this.err = null;
  }

  data(data) {
    this.response = data;
    return this;
  }

  error(error) {
    this.err = error;
    return this;
  }

  toJson() {
    return {
      success: this.success,
      response: this.response,
      error: this.err,
    }
  }
}

module.exports = Response;