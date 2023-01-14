const csvCombiner = require('./csvCombiner')
csvCombiner.combineFiles('','','')
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });



