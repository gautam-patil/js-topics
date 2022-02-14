const express = require('express');

// Require logger.js
const logger = require('./utils/logger');
const app = express();
const port = 3000;
const host = "localhost";

// Dummy Express GET call
app.get('/',(req,res) => {
    res.send("Hello World!");
    logger.info("Server Sent A Hello World");``
    
})

// Introduce error by using undefined variable 'y'
app.get('/calc',(req,res) => {
    
    const x = y + 10;
    console.log(x.toString());
    res.send(x.toString());
})

// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Could not perform the calculation!');
   logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
// Run the server
app.listen(port, () => {
    
    logger.info(`Server started and running on http://${host}:${port}`)
})