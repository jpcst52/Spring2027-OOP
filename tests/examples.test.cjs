const test = require('node:test');
const assert = require('node:assert/strict');
const { ServiceRequest } = require('../week-01/example.cjs');
const { Counter } = require('../week-02/example.cjs');
const { Request } = require('../week-03/example.cjs');
const { MaintenanceRequest, TechnologyRequest, summarize } = require('../week-04/example.cjs');
const { RequestService, RecordingNotifier } = require('../week-05/example.cjs');
const { createRequest } = require('../week-06/example.cjs');
const { linearSearch } = require('../week-07/example.cjs');
const { UndoHistory } = require('../week-08/example.cjs');
const { ServiceQueue } = require('../week-09/example.cjs');
const { indexRequests } = require('../week-10/example.cjs');
const { shortestRoute } = require('../week-11/example.cjs');

test('objects describe their own state and instances remain independent', () => {
  assert.match(new ServiceRequest('R1', 'Printer').summary(), /R1: Printer \(open\)/);
  const first = new Counter('first');
  const second = new Counter('second');
  first.increment();
  assert.equal(first.value, 1);
  assert.equal(second.value, 0);
});

test('closing preserves the invariant, including rejected and repeated changes', () => {
  const request = new Request();
  assert.throws(() => request.close('  '), /resolution/i);
  assert.equal(request.status, 'open');
  request.close(' repaired ');
  assert.equal(request.resolution, 'repaired');
  assert.throws(() => request.close('again'), /already closed/i);
});

test('polymorphism and injected collaborators preserve contracts', () => {
  assert.deepEqual(summarize([new MaintenanceRequest('M'), new TechnologyRequest('T')]),
    ['Request M: maintenance', 'Request T: technology']);
  const notifier = new RecordingNotifier();
  const service = new RequestService(notifier);
  service.submit(' R1 ');
  assert.deepEqual(notifier.messages, ['Submitted R1']);
  assert.throws(() => service.submit(' '), /ID/);
  assert.deepEqual(createRequest(' R1 ', ' printer '),
    { id: 'R1', description: 'printer', status: 'open' });
});

test('search, stack and queue cover order and empty inputs', () => {
  assert.deepEqual(linearSearch([1, 2, 3], 3), { index: 2, comparisons: 3 });
  assert.deepEqual(linearSearch([], 9), { index: -1, comparisons: 0 });
  const history = new UndoHistory();
  history.record('A');
  history.record('B');
  assert.equal(history.undo(), 'B');
  assert.equal(history.undo(), 'A');
  assert.throws(() => history.undo(), /nothing/i);
  const queue = new ServiceQueue();
  queue.enqueue('A');
  queue.enqueue('B');
  assert.equal(queue.dequeue(), 'A');
  assert.equal(queue.dequeue(), 'B');
  assert.throws(() => queue.dequeue(), /empty/i);
  queue.enqueue('C');
  assert.equal(queue.dequeue(), 'C');
});

test('index rejects duplicate IDs and BFS returns a shortest route', () => {
  assert.equal(indexRequests([{ id: 'A', value: 1 }]).get('A').value, 1);
  assert.throws(() => indexRequests([{ id: 'A' }, { id: 'A' }]), /duplicate/i);
  const graph = { A: ['B', 'C'], B: ['D'], C: [], D: [], E: [] };
  assert.deepEqual(shortestRoute(graph, 'A', 'D'), ['A', 'B', 'D']);
  assert.deepEqual(shortestRoute(graph, 'A', 'A'), ['A']);
  assert.equal(shortestRoute(graph, 'A', 'E'), null);
  assert.throws(() => shortestRoute(graph, 'A', 'missing'), /unknown/i);
});
