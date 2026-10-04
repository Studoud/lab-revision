const test = require("node:test");
const assert = require("node:assert/strict");

const server = require("../src/app");

test("health is healthy", async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/health`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.deepEqual(body, { status: "ok" });
  server.close();
});

test("GET /version returns service and version", async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/version`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.deepEqual(body, { service: "platform-demo", version: "1.0.0" });
  server.close();
});
