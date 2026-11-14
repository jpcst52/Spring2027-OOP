class RequestService {
  constructor(notifier) {
    this.notifier = notifier;
  }

  submit(id) {
    if (typeof id !== 'string' || !id.trim()) throw new Error('An ID is required');
    this.notifier.notify(`Submitted ${id.trim()}`);
  }
}

class RecordingNotifier {
  constructor() {
    this.messages = [];
  }

  notify(message) {
    this.messages.push(message);
  }
}

if (require.main === module) {
  const notifier = new RecordingNotifier();
  new RequestService(notifier).submit('R1');
  console.log(notifier.messages);
}

module.exports = { RequestService, RecordingNotifier };
