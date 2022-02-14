const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');
const express = require('express');
// const redisFunc = require('./redisFunc');

// console.log(redisFunc());
const app = express();
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

client.on('connect', function() {
  console.log('Connected!'); // Connected!
});

// Strings

// client.set('framework', 'Angular', function(err, reply) {
//   console.log(reply); // OK
// });

// client.get('framework', function(err, reply) {
//   console.log(reply); // ReactJS
// });

// // Hashes

// client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

// client.hgetall('frameworks_hash', function(err, object) {
//   console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
// });

// // Lists

// client.rpush(['frameworks_list', 'React', 'Angular'], function(err, reply) {
//   console.log(reply); // 2
// });

// client.lrange('frameworks_list', 0, -1, function(err, reply) {
//   console.log(reply); // [ 'ReactJS', 'Angular' ]
// });

// // Sets

// client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function(err, reply) {
//   console.log(reply); // 4
// });

// client.smembers('frameworks_set', function(err, reply) {
//   console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
// });

// // Check the existence of a key

// client.exists('framework', function(err, reply) {
//   if (reply === 1) {
//     console.log('Exists!');
//   } else {
//     console.log('Doesn\'t exist!');
//   }
// });

// // Delete a key

// client.del('frameworks_list', function(err, reply) {
//   console.log(reply); // 1
// });

// // Increment a key

// client.set('working_days', 5, function() {
//   client.incr('working_days', function(err, reply) {
//     console.log(reply); // 6
//   });
// });

// app.get('/users', (req, res) => {

//     try {
//       axios.get(`${USERS_API}`).then(function (response) {
//         const users = response.data;
//         console.log('Users retrieved from the API');
//         res.status(200).send(users);
//       });
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });
  
//   app.get('/cached-users', (req, res) => {
  
//     try {
//       client.get('users', (err, data) => {
  
//         if (err) {
//           console.error(err);
//           throw err;
//         }
  
//         if (data) {
//           console.log('Users retrieved from Redis');
//           res.status(200).send(JSON.parse(data));
//         } else {
//           axios.get(`${USERS_API}`).then(function (response) {
//             const users = response.data;
//             client.setex('users', 600, JSON.stringify(users));
//             console.log('Users retrieved from the API');
//             res.status(200).send(users);
//           });
//         }
//       });
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   });
  
//   const PORT = 3000;
//   app.listen(PORT, () => {
//     console.log(`Server started at port: ${PORT}`);
//   });