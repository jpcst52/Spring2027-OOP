function linearSearch(items, target) {
  let comparisons = 0;
  for (let index = 0; index < items.length; index += 1) {
    comparisons += 1;
    if (items[index] === target) return { index, comparisons };
  }
  return { index: -1, comparisons };
}

if (require.main === module) {
  console.log(linearSearch(['A', 'B', 'C'], 'C'));
  console.log(linearSearch(['A', 'B', 'C'], 'missing'));
}

module.exports = { linearSearch };
