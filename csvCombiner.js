var fs = require('fs'),
path = require('path')

function writeToCombinedFile(line, fileName, firstFile = false)
{
    console.log(firstFile)
    data = formatLine(line, fileName)
    if (firstFile)
    {
        data = line + "," + "\"filename\"" + "\n"
        fs.appendFile('Output.csv', data, (err) => {
          
            // In case of a error throw err.
            if (err) throw err;
        })
    }
    else 
    {
        data = formatLine(line, fileName)
        fs.appendFile('Output.csv', data, (err) => {
          
            // In case of a error throw err.
            if (err) throw err;
        })
    }
    
}
function formatLine(line, fileName)
{
    content = line.split(',');
    if (content.length != 2)
    {
        throw new Error;
    }
    
    const newLine = appendToCSVLine(line, fileName)
    
    return newLine
    
}

function appendToCSVLine(line, valueToAppend)
{
    line = line + "," + valueToAppend + "\n"
    return line
}
function readFileIntoLines(name)
{
    const readline = require('readline');

    void (async () => {
        const rl = readline.createInterface({
        input: fs.createReadStream('accessories.csv'),
        crlfDelay: Infinity,
        });
    
    var isFirst = true
    rl.on('line', (line) => {
        if (isFirst)
        {
            writeToCombinedFile(line, "accessories.csv", true);
            isFirst = !isFirst
        }
        else {
            writeToCombinedFile(line, "accessories.csv");
        }
    });

    await new Promise((res) => rl.once('close', res));

 
    })();
}

const combineFiles = (a, b, c) => {

   readFileIntoLines("accessories.csv")
}

exports.combineFiles = combineFiles