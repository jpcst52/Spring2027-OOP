class UndoHistory {
  #entries = [];

  record(action) {
    this.#entries.push(action);
  }

  undo() {
    if (this.#entries.length === 0) throw new Error('Nothing to undo');
    return this.#entries.pop();
  }
}

if (require.main === module) {
  const history = new UndoHistory();
  history.record('add task');
  history.record('edit task');
  console.log(history.undo());
}

module.exports = { UndoHistory };
