const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/" , (req,res)=>{
    res.send("Welcome to Video Call App");
});

server.listen(3000 , ()=>{
	console.log("Server running on port 3000");
})
