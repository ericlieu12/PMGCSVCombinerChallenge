const csvCombiner = require('./csvCombiner')

const fileNameArray = []
var outputFile = ""
var args = process.argv.slice(2);
args.forEach(function (val, index) {

  if (val == ">")
  {
    outputFile = args[index + 1]
  }
  else {
    fileNameArray.push(val)
  }
  });
  csvCombiner.combineFiles(fileNameArray, outputFile)





