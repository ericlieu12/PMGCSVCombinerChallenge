const new1 = require('./new')
 
test('string with a single number should result in the number itself', () => {
    expect(new1.add(1, 3)).toBe(4);
  });