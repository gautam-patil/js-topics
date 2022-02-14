const fs = require('fs');

const createLogs = (logData) => {

    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    let finalLog = datetime + "--" + logData.logs;
    fs.appendFile(logData.fileName, `\n${finalLog}`, function (err) {
        if (err) throw err;
    });
}

module.exports = {

     createLogs,
}