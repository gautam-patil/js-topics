
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const produce = require("./produce")
const consume = require("./consume");

const PORT = 4000;

http.listen(PORT, () => {
    console.log('1st server started on port= '+ PORT);
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {

    let data = { message: "userConnected"} 
    produce(data).catch((err) => {
        console.error(err)
    })
    console.log('Connected...')
    socket.on('message', (msg) => {
        // socket.broadcast.emit('message', msg)
        let data = msg;
        produce(data).catch((err) => {
            console.error("error in producer: ", err)
        })
    })
    
    consume(socket) 
    // socket.on('user', (user) => {
    //     socket.broadcast.emit('user', user)
    // })
    socket.on('privateMessage', (msg) => {

        console.log(msg);
        socket.broadcast.emit('privateMessage', msg)
    })
})
