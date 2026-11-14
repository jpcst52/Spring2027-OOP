function indexRequests(requests) {
  const byId = new Map();
  for (const request of requests) {
    if (byId.has(request.id)) throw new Error(`Duplicate ID: ${request.id}`);
    byId.set(request.id, request);
  }
  return byId;
}

if (require.main === module) {
  const index = indexRequests([{ id: 'R1', status: 'open' }]);
  console.log(index.get('R1'));
}

module.exports = { indexRequests };
