const { parseStringSQL } = require('../helpers/parseStringSQL');

const example = 'I\'m a test to check for error\'s in this "string" \'ABC\'';

test('parseStringSql should parse single quotes', () => {
  expect(parseStringSQL(example)).toEqual('I\'\'m a test to check for error\'\'s in this "string" \'\'ABC\'\'');
});
