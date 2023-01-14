const csvCombiner = require('./csvCombiner')

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });