var fs = require('fs'),
path = require('path')

function writeToCombinedFile(line, fileName, firstFile = false)
{
    
    
    if (firstFile)
    {
        data = line + "," + "\"filename\"" 
        console.log(data)
    }
    else 
    {
        data = formatLine(line, fileName)
        console.log(data)
    }
    
}
function formatLine(line, fileName)
{
    content = line.split(',');
    if (content.length != 2)
    {
        throw new Error;
    }
    
    const newLine = appendToCSVLine(line, "\"" + fileName + "\"")
    
    return newLine
    
}

function appendToCSVLine(line, valueToAppend)
{
    line = line + "," + valueToAppend
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

const combineFiles = (arrayOfFileNames, outputFile) => {

   arrayOfFileNames.forEach(fileName => 
    
    readFileIntoLines(fileName))
 
}

exports.combineFiles = combineFiles