var fs = require('fs'),
path = require('path')
function writeToFile(name)
{
    fs.writeFile('Output.txt', data, (err) => {
          
        // In case of a error throw err.
        if (err) throw err;
    })
}

function readFileIntoLines(name)
{
    const readline = require('readline');

    void (async () => {
    const rl = readline.createInterface({
    input: fs.createReadStream('accessories.csv'),
    crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      console.log('line: ', line);
    });

    await new Promise((res) => rl.once('close', res));

 
    })();
}

const combineFiles = (a, b, c) => {

    fileHandler.readFileIntoLines("accessories.csv")
}



exports.combineFiles = combineFiles