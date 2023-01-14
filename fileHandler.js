var fs = require('fs'),
path = require('path')

function readFile(name) {
    filePath = path.join(__dirname, name);

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
  if (!err) {
      console.log('received data: ' + data);
  } else {
      console.log(err);
  }
});
}


exports.readFile = readFile