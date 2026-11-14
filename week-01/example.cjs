class ServiceRequest {
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.status = 'open';
  }

  summary() {
    return `${this.id}: ${this.description} (${this.status})`;
  }
}

if (require.main === module) {
  console.log(new ServiceRequest('R1', 'Repair the library printer').summary());
}

module.exports = { ServiceRequest };
