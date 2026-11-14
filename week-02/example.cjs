class Counter {
  constructor(label) {
    this.label = label;
    this.value = 0;
  }

  increment() {
    this.value += 1;
  }
}

if (require.main === module) {
  const first = new Counter('first');
  const second = new Counter('second');
  first.increment();
  console.log(first.value, second.value);
}

module.exports = { Counter };
