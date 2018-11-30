const parseStringSQL = (input) => {
  // fixes string for correct sql input
  let result = '';
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === "'") {
      result += "'";
    }
    result += input[i];
  }
  return result;
};

module.exports = {
  parseStringSQL,
};
