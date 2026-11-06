import test from 'node:test';
import assert from 'node:assert/strict';
import { executeCode } from './codeRunner';

test('executes JavaScript console.log correctly', () => {
  const code = `
    const user = { name: "Nora", level: 99 };
    console.log("Welcome " + user.name + " Level: " + user.level);
  `;
  const result = executeCode(code, 'javascript');
  assert.equal(result.success, true);
  assert.match(result.stdout, /Welcome Nora Level: 99/);
});

test('catches TypeError in JavaScript unoptional chaining', () => {
  const code = `
    const user = {};
    const avatar = user.profile.avatar;
    console.log(avatar);
  `;
  const result = executeCode(code, 'javascript');
  assert.equal(result.success, false);
  assert.equal(result.error?.type, 'TypeError');
});

test('executes SQL queries against virtual database', () => {
  const query = `SELECT * FROM students WHERE score > 90 ORDER BY score DESC;`;
  const result = executeCode(query, 'sql');
  assert.equal(result.success, true);
  assert.match(result.stdout, /Elena Rostova/);
  assert.match(result.stdout, /Sarah Chen/);
});

test('catches SQL syntax errors when SELECT is omitted', () => {
  const query = `GET ALL FROM students`;
  const result = executeCode(query, 'sql');
  assert.equal(result.success, false);
  assert.equal(result.error?.type, 'SyntaxError');
});
