const express = require('express');
const app = express();

const logger = require('./utils/logFunction');

logger.logger('firstLogs');

app.get('/', (req, res) => {

    res.send('Hello World!!');
    logger.logs('Hello World!!!');
})

// function logger(logs){

//     fs.appendFile('log.txt', `\n${logs}`, function (err) {
//         if (err) throw err;
//         console.log(logs);
//       });
// }


const PORT = 3000;
app.listen(PORT, () => {
//   logger(`Server started at port: ${PORT}`);
});