import test from 'node:test';
import assert from 'node:assert/strict';
import { simulatePythonExecution } from './pythonRunner';

test('simulates successful python print statements', () => {
  const code = `
name = "NORA"
print(f"Hello from {name}!")
  `.trim();
  const res = simulatePythonExecution(code);
  assert.equal(res.success, true);
  assert.match(res.stdout, /Hello from NORA!/);
});

test('catches IndexError in shopping cart scenario', () => {
  const code = `
cart = ["Keyboard", "Mouse", "Monitor"]
last_item = cart[len(cart)]
print(last_item)
  `.trim();
  const res = simulatePythonExecution(code);
  assert.equal(res.success, false);
  assert.equal(res.error?.type, 'IndexError');
  assert.equal(res.error?.line, 2);
});

test('catches TypeError in string temperature arithmetic', () => {
  const code = `
temp_f = "72"
celsius = (temp_f - 32) * 5 / 9
print(celsius)
  `.trim();
  const res = simulatePythonExecution(code);
  assert.equal(res.success, false);
  assert.equal(res.error?.type, 'TypeError');
});

test('detects indentation errors after colon', () => {
  const code = `
def greet():
print("Hello")
  `.trim();
  const res = simulatePythonExecution(code);
  assert.equal(res.success, false);
  assert.equal(res.error?.type, 'IndentationError');
});
