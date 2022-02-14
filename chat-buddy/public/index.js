const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.messages');
let allUsers = document.querySelector('.allUsers');

do{

    name = prompt("Enter your unique name");
    socket.emit('user', name);
    allUsers.innerHTML += name;
}while(!name)

textarea.addEventListener('keyup', (e) => {

    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})
//For private message
// if(name){
    
//     privateMessage.addEventListener('keyup', (e) => {

//         if(e.key === 'Enter'){
//             sendPrivateMessage(e.target.id, e.target.value);
//         }
//     })
// }

function sendMessage(message){

    let msg = {

        user: name,
        message: message
    }
    textarea.value = "";
    socket.emit('message', msg);
    messageArea.innerHTML += msg.user;
    messageArea.innerHTML += "---";
    messageArea.innerHTML += msg.message;
}

//For private message to send
function sendPrivateMessage(user){

    message = document.getElementById("textarea").value;
    let msg = {

        user: user,
        message: message,
        name: name
    }
    console.log(message);
    socket.emit('privateMessage', msg);
    messageArea.innerHTML += "my";
    messageArea.innerHTML += "---";
    messageArea.innerHTML += msg.message;
}

socket.on('message', (msg) => {

    messageArea.innerHTML += msg.user;
    messageArea.innerHTML += "---";
    messageArea.innerHTML += msg.message;
})

socket.on('privateMessage', (msg) => {

    console.log(msg);
    console.log(name);
    if(name == msg.user){
        messageArea.innerHTML += msg.name;
        messageArea.innerHTML += "---";
        messageArea.innerHTML += msg.message;
    }
    
})

//Display Users
socket.on('user', (user) => {

    allUsers.innerHTML += '<button id="'+user+'" onclick="sendPrivateMessage(this.id)">'+user+'</button>';
    allUsers.innerHTML += '<div id = "'+user+'"></div>';
})


