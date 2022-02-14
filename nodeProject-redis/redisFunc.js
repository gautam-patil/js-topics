const redis = require('redis');
const client = redis.createClient();

function getRedis(){
    client.rpush(['frameworks_list', 'React', 'Angular'], function(err, reply) {
        console.log(reply); // 2
    });

    client.lrange('frameworks_list', 0, -1, function(err, reply) {
        console.log(reply); // [ 'ReactJS', 'Angular' ]
    });
}

module.exports = getRedis;
