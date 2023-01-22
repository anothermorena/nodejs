const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;

//export the functions to use as modules in the locations/files
module.exports = {
  add,
  subtract,
  multiply,
  divide,
};

//we can also export the above functions like below and achieve the exact same results
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.divide = (a, b) => a / b;
exports.multiply = (a, b) => a * b;
