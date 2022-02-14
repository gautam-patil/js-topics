const createLogs = require('./logCode');

const logger = (logs) => {
    const transport = 
        {
            fileName: './log.log',
            logs: logs,
        }
    createLogs.createLogs(transport);
}

module.exports = {

    logger,
}