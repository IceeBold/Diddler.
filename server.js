const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

const users = {};


io.on('connection', (socket) => {
    socket.on('set username', (username) => {
        socket.username = username; // Store the username in the socket object
    });

    socket.on('chat message', (msg) => {
        const messageData = {
            sender: socket.username || 'Anonymous',
            msg: msg
        };
        io.emit('chat message', messageData); // Send message data to all clients
    });

    // Other event handlers...
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});



server.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});

// ... existing code ...
io.on("connection", (socket) => {
    console.log("A user connected");
 
    // Join group
    socket.on("joinGroup", (group) => {
       socket.join(group);
       io.to(group).emit("update users", getUsersInGroup(group));
    });
 
    socket.on("chatMessage", (msg, group) => {
       io.to(group).emit("chat message", { sender: socket.username, msg });
    });
 
    // Add logic for getting users in the group
    function getUsersInGroup(group) {
       return Object.keys(io.sockets.sockets)
          .filter(id => io.sockets.sockets[id].rooms.has(group))
          .map(id => io.sockets.sockets[id].username);
    }
 
    // ... existing code ...
 });

 // ... existing code ...
io.on("connection", (socket) => {
    console.log("A user connected");
 
    // Join group
    socket.on("joinGroup", (group) => {
       socket.join(group);
       io.to(group).emit("update users", getUsersInGroup(group));
    });
 
    socket.on("chatMessage", (msg, group) => {
       io.to(group).emit("chat message", { sender: socket.username, msg });
    });
 
    // Add logic for getting users in the group
    function getUsersInGroup(group) {
       return Object.keys(io.sockets.sockets)
          .filter(id => io.sockets.sockets[id].rooms.has(group))
          .map(id => io.sockets.sockets[id].username);
    }
 
    // ... existing code ...
 });

