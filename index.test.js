const csvCombiner = require('./csvCombiner');
const fs = require('fs');
test('formats header correctly', async () => {
  var testString = `"sample","sample"`
  expect(csvCombiner.formatHeader(testString)).toBe(`"sample","sample","filename"`);
});

test('formats line correctly', async () => {
  var testString = `"sample","sample"`
  var testFile = "sample.csv"
  expect(csvCombiner.formatLine(testString, testFile)).toBe(`"sample","sample","sample.csv"`);
});

test('checks line format correctly', async () => {
  var testString = `"sample","sample"`
  var testString2 = `"sample","sample","sample"`
  expect(csvCombiner.isLineCorrectlyFormatted(testString)).toBe(true);
  expect(csvCombiner.isLineCorrectlyFormatted(testString2)).toBe(false);
});

test('checks writing to line works', async () => {
  var testString = `"sample", "sample"`
  const logSpy = jest.spyOn(console, 'log');

  csvCombiner.writeToCombinedFile(testString)

  expect(logSpy).toHaveBeenCalledWith(testString);

});
test('checks combine file for files with 2 columns', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["fixtures/smallsample.csv", "fixtures/smallsample2.csv"])

  await expect(logSpy).toHaveBeenCalledWith(`"big","big2","filename"`)
  await expect(logSpy).toHaveBeenCalledWith(`"b9f6f22276c919da793da65c76345ebb0b072257d12402107d09c89bc369a6b6","Blouses","smallsample.csv"`)
  await expect(logSpy).toHaveBeenCalledWith(`"c2b5fa9e09ef2464a2b9ed7e351a5e1499823083c057913c6995fdf4335c73e7","Shirts","smallsample.csv"`)
  await expect(logSpy).toHaveBeenCalledWith(`"b9f6f22276c919da793da65c76345ebb0b072257d12402107d09c89bc369a6b6","Shoes","smallsample2.csv"`)
  await expect(logSpy).toHaveBeenCalledWith(`"c2b5fa9e09ef2464a2b9ed7e351a5e1499823083c057913c6995fdf4335c73e7","Pants","smallsample2.csv"`)

 
});

test('checks combine file for files with 3 columns', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["fixtures/smallsample3.csv", "fixtures/smallsample4.csv"])

  await expect(logSpy).toHaveBeenCalledWith(`"big","big2","big3","filename"`)
  await expect(logSpy).toHaveBeenCalledWith(`"b9f6f22276c919da793da65c76345ebb0b072257d12402107d09c89bc369a6b6","Blouses","test","smallsample3.csv"`)
  await expect(logSpy).toHaveBeenCalledWith(`"c2b5fa9e09ef2464a2b9ed7e351a5e1499823083c057913c6995fdf4335c73e7","Shirts","test","smallsample3.csv"`)
  await expect(logSpy).toHaveBeenCalledWith(`"b9f6f22276c919da793da65c76345ebb0b072257d12402107d09c89bc369a6b6","Blouses","t3est","smallsample4.csv"`)
  await expect(logSpy).toHaveBeenCalledWith(`"c2b5fa9e09ef2464a2b9ed7e351a5e1499823083c057913c6995fdf4335c73e7","Shirts","test2","smallsample4.csv"`)

 
});

test('checks combine file where files have different columns', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["fixtures/smallsample3.csv", "fixtures/smallsample2.csv"])

  await expect(logSpy).toHaveBeenCalledWith(`Error: Not correctly formatted. Stopping process now.`)
  

 
});

test('checks combine file where files have same number of columns but different column names', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["fixtures/smallsample2.csv", "fixtures/clothing.csv"])

  await expect(logSpy).toHaveBeenCalledWith(`Error: Not the same header value. Stopping process now.`)
  

 
});

test('improper file not submitted', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles(["smallsample.csa"])

  await expect(logSpy).toHaveBeenCalledWith(`Error: improper files.`)

 
});

test('no file will throw error', async () => {
 
  const logSpy = jest.spyOn(console, 'log');
  await csvCombiner.combineFiles([])

  await expect(logSpy).toHaveBeenCalledWith(`Error: no files selected.`)

 
});