class ServiceQueue {
  #items = [];
  #front = 0;

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    if (this.#front === this.#items.length) throw new Error('Queue is empty');
    const item = this.#items[this.#front];
    this.#front += 1;
    if (this.#front === this.#items.length) {
      this.#items = [];
      this.#front = 0;
    }
    return item;
  }
}

if (require.main === module) {
  const queue = new ServiceQueue();
  queue.enqueue('A');
  queue.enqueue('B');
  console.log(queue.dequeue(), queue.dequeue());
}

module.exports = { ServiceQueue };
