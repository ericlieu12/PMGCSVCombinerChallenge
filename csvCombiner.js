var fs = require('fs'),
    path = require('path')
var headerAlreadyWritten = false;

const combineFiles = async (arrayOfFileNames) => {
    if (arrayOfFileNames.length == 0)
    {
        console.log("Error, no files selected.")
        return;
    }
    for (const fileName of arrayOfFileNames)
    {
        if (fileName.substring(fileName.length - 4, fileName.length) != ".csv")
        {
            console.log("Error, improper files.")
            return;
        }
    }
    for (const fileName of arrayOfFileNames) {
       
        await readFileandWriteToOutputFile(fileName).then(
            
        )
        .catch(error => {
            console.log(`Error: ${error}`)
        })

    }

}

async function readFileandWriteToOutputFile(fileName) {

    return new Promise((resolve, reject) => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: fs.createReadStream(fileName),
            crlfDelay: Infinity,
        });

        var isHeader = true
        rl.on('line', (line) => {
            try {
                if (!isLineCorrectlyFormatted(line)) {
                    throw new Error("Not correctly formatted.");
                }
                if (isHeader) {
                    isHeader = !isHeader
                    if (!headerAlreadyWritten) {
                        data = formatHeader(line, fileName)
                        writeToCombinedFile(data);
                        headerAlreadyWritten = !headerAlreadyWritten
                    }
                }
                else {
                    data = formatLine(line, fileName)
                    writeToCombinedFile(data);
                }
            }
            catch (error)
            {
                reject(error);
            }
            
        });

        rl.on('close', function () {
            resolve();
        });
        rl.on('error', function (error) {
            reject(error);
        });

    })


}
function writeToCombinedFile(data) {
    console.log(data)
}
function formatHeader(line) {
    const newLine = `${line},\"fileName\"`
    return newLine
}
function formatLine(line, fileName) {
    const newLine = `${line},\"${fileName}\"`
    return newLine
}
function isLineCorrectlyFormatted(line) {
    lineSplit = line.split(',');
    if (lineSplit.length != 2) {
        return false
    }
    return true
}


exports.combineFiles = combineFiles
exports.isLineCorrectlyFormatted = isLineCorrectlyFormatted
exports.formatHeader = formatHeader
exports.formatLine = formatLine
exports.writeToCombinedFile = writeToCombinedFile
exports.readFileandWriteToOutputFile = readFileandWriteToOutputFile