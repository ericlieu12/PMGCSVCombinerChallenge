var fs = require('fs'),
    path = require('path');
var headerAlreadyWritten = false;
var amountOfColumns = null;
var headerValue = "";


const combineFiles = async (arrayOfFileNames) => {
    //reinitialize variables whenever combining files
    headerValue = "";
    headerAlreadyWritten = false;
    amountOfColumns = null;
    //#region check for improper format of the arguments
    
    if (arrayOfFileNames.length == 0)
    {
        console.log("Error: no files selected.")
        return;
    }
    for (const fileName of arrayOfFileNames)
    {
        if (fileName.substring(fileName.length - 4, fileName.length) != ".csv")
        {
            console.log("Error: improper files.")
            return;
        }
    }

    //#endregion

    for (const fileName of arrayOfFileNames) {
       
       
        await readFileandWriteToOutputFile(fileName).then(
            
        )
        .catch(error => {
            console.log(`${error} Stopping process now.`)
        })

    }

}

async function readFileandWriteToOutputFile(fileName) {
    
    return new Promise((resolve, reject) => {
        const readline = require('readline');
        var rl = readline.createInterface({
            input: fs.createReadStream(fileName),
         
        });
        var isHeader = true

      
        rl.on('line', (line) => {
               
                if (!isLineCorrectlyFormatted(line)) {
                    rl.emit("error", new Error("Not correctly formatted."))
                    return;
                }
                
                if (isHeader) {
                    isHeader = !isHeader
                    if (!headerAlreadyWritten) {
                        data = formatHeader(line)
                        setHeader(data)
                        writeToCombinedFile(data);
                        headerAlreadyWritten = !headerAlreadyWritten
                    }
                    else {
                        if (headerValue != formatHeader(line))
                        {
                            
                            rl.emit("error", new Error("Not the same header value."))
                          
                        }
                        
                    }
                }
                else {
                    data = formatLine(line, fileName)
                    writeToCombinedFile(data);
                }
            
          
            
        });
        
        rl.on('close', function (error) {
           
                resolve();
            
            //resolve promise if everything runs smoothly (i.e. running through entire file)
            
        });
        rl.on('error', function (error) {
           
            //reject promise if error (error handled elsewhere)
            rl.removeAllListeners();
            //stop all listeners bc there is a buffer of lines
            reject(error);
            
        });

    })


}
function setHeader(value) {
    headerValue = value
}
function writeToCombinedFile(data) {
    //writes to the output file
    console.log(data)
}
function formatHeader(line) {
    //formats header line of output file
    amountOfColumns = line.split(",").length
    const newLine = `${line},\"filename\"`
    return newLine
}
function formatLine(line, fileName) {
    if (fileName.includes("/"))
    {
        //then we know it is not the base path
        fileName =  fileName.split("/")[fileName.split("/").length -1]
        //get base path
    }
    //formats normal line of output file
    const newLine = `${line},\"${fileName}\"`
    return newLine
}
function isLineCorrectlyFormatted(line) {

    //#region precautionary measure
    //column count set by format header, since header is the first to come in a file
    //if not set already, call function to set it
    if (amountOfColumns === null)
    {
        //get correct column amount
        formatHeader(line)
    }
    //#endregion

    //checks if line is correctly formatted from input file
    lineSplit = line.split(',');
    if (lineSplit.length != amountOfColumns) {
        return false
    }
    return true
}

//#region exports
exports.combineFiles = combineFiles
exports.isLineCorrectlyFormatted = isLineCorrectlyFormatted
exports.formatHeader = formatHeader
exports.formatLine = formatLine
exports.writeToCombinedFile = writeToCombinedFile
exports.readFileandWriteToOutputFile = readFileandWriteToOutputFile
//#endregion