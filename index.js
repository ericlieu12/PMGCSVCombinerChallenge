const csvCombiner = require('./csvCombiner')
const fileHandler = require('./fileHandler')
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

  fileHandler.readFile("accessories.csv")

