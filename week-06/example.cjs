function normalizeDescription(description) {
  if (typeof description !== 'string' || !description.trim()) {
    throw new Error('A description is required');
  }
  return description.trim();
}

function createRequest(id, description) {
  if (typeof id !== 'string' || !id.trim()) throw new Error('An ID is required');
  return { id: id.trim(), description: normalizeDescription(description), status: 'open' };
}

if (require.main === module) {
  console.log(createRequest('R1', '  Repair printer  '));
}

module.exports = { createRequest, normalizeDescription };
