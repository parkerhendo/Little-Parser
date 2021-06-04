/**
 * Main test runner.
*/

const assert = require('assert').strict;
const { Parser } = require('../src/Parser');

// List of Tests
const tests = [
  require('./literals.test.js'), 
  require('./statementList.test.js'),
  require('./block.test.js'),
  require('./empty-statement.test.js'),
  require('./math.test.js')
];

const parser = new Parser();

function exec() {
  const program = `

    {
      x = 10;
      x += 1;
    }

  `;
  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

// manual text
exec();

function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepEqual(ast, expected);
}

tests.forEach(testRun => testRun(test));
console.log("all assertions pass");