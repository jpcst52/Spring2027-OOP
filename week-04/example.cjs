class Request {
  constructor(id) {
    this.id = id;
  }

  summary() {
    return `Request ${this.id}`;
  }
}

class MaintenanceRequest extends Request {
  summary() {
    return `${super.summary()}: maintenance`;
  }
}

class TechnologyRequest extends Request {
  summary() {
    return `${super.summary()}: technology`;
  }
}

function summarize(requests) {
  return requests.map(request => request.summary());
}

if (require.main === module) {
  console.log(summarize([new MaintenanceRequest('M1'), new TechnologyRequest('T1')]));
}

module.exports = { MaintenanceRequest, TechnologyRequest, summarize };
