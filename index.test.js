const csvCombiner = require('./csvCombiner');
const fs = require('fs');
test('formats header correctly', () => {
  var testString = `"sample","sample"`
  expect(csvCombiner.formatHeader(testString)).toBe(`"sample","sample","filename"`);
});

test('formats line correctly', () => {
  var testString = `"sample","sample"`
  var testFile = "sample.csv"
  expect(csvCombiner.formatLine(testString, testFile)).toBe(`"sample","sample","sample.csv"`);
});

test('checks line format correctly', () => {
  var testString = `"sample","sample"`
  var testString2 = `"sample","sample","sample"`
  expect(csvCombiner.isLineCorrectlyFormatted(testString)).toBe(true);
  expect(csvCombiner.isLineCorrectlyFormatted(testString2)).toBe(false);
});

test('checks writing to line works', () => {
  var testString = `"sample", "sample"`
  const logSpy = jest.spyOn(console, 'log');

  csvCombiner.writeToCombinedFile(testString)

  expect(logSpy).toHaveBeenCalledWith(testString);

});

test('checks combine file', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["smallsample.csv", "smallsample2.csv"])

  expect(logSpy).toHaveBeenCalledWith(`"big","big2","filename"`)
  expect(logSpy).toHaveBeenCalledWith(`"b9f6f22276c919da793da65c76345ebb0b072257d12402107d09c89bc369a6b6","Blouses","smallsample.csv"`)
  expect(logSpy).toHaveBeenCalledWith(`"c2b5fa9e09ef2464a2b9ed7e351a5e1499823083c057913c6995fdf4335c73e7","Shirts","smallsample.csv"`)
  expect(logSpy).toHaveBeenCalledWith(`"b9f6f22276c919da793da65c76345ebb0b072257d12402107d09c89bc369a6b6","Shoes","smallsample2.csv"`)
  expect(logSpy).toHaveBeenCalledWith(`"c2b5fa9e09ef2464a2b9ed7e351a5e1499823083c057913c6995fdf4335c73e7","Pants","smallsample2.csv"`)

 
});

test('improper file not submitted', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["smallsample.csa"])

  expect(logSpy).toHaveBeenCalledWith(`Error, improper files.`)

 
});

test('no file will throw error', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles([])

  expect(logSpy).toHaveBeenCalledWith(`Error, no files selected.`)

 
});