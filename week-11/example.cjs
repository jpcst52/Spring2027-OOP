function shortestRoute(graph, start, destination) {
  if (!Object.hasOwn(graph, start) || !Object.hasOwn(graph, destination)) {
    throw new Error('Unknown vertex');
  }
  const pending = [start];
  const previous = new Map([[start, null]]);
  for (let index = 0; index < pending.length; index += 1) {
    const vertex = pending[index];
    if (vertex === destination) {
      const path = [];
      for (let current = vertex; current !== null; current = previous.get(current)) {
        path.push(current);
      }
      return path.reverse();
    }
    for (const neighbor of graph[vertex]) {
      if (!Object.hasOwn(graph, neighbor)) throw new Error(`Unknown neighbor: ${neighbor}`);
      if (!previous.has(neighbor)) {
        previous.set(neighbor, vertex);
        pending.push(neighbor);
      }
    }
  }
  return null;
}

if (require.main === module) {
  const graph = { library: ['hall'], hall: ['library', 'lab'], lab: ['hall'] };
  console.log(shortestRoute(graph, 'library', 'lab'));
}

module.exports = { shortestRoute };
