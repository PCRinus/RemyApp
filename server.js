const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    //single user welcome 
    socket.emit('message', 'Welocme!');
    //all of the clients except the client that is connecting
    socket.broadcast.emit('message', 'Un user a intrat');
    //runs on disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'un user a iesit');
    })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));