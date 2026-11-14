class Request {
  #status = 'open';
  #resolution = null;

  get status() {
    return this.#status;
  }

  get resolution() {
    return this.#resolution;
  }

  close(resolution) {
    if (this.#status === 'closed') throw new Error('Request is already closed');
    if (typeof resolution !== 'string' || !resolution.trim()) {
      throw new Error('A resolution is required');
    }
    this.#resolution = resolution.trim();
    this.#status = 'closed';
  }
}

if (require.main === module) {
  const request = new Request();
  request.close('Replaced the toner');
  console.log(request.status, request.resolution);
}

module.exports = { Request };
