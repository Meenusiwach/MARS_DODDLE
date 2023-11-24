

const http = require("http");
const express = require('express');
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message);
    });
});

// // Use path.resolve to get the absolute path to the "public1" directory
 app.use(express.static(path.resolve(__dirname, "./public")));

 app.get('/', (req, res) => {
    res.render('chat.ejs'); // Renders the 'example.ejs' file in your views directory
  });
  io.on('connection', (socket1) => {
    // Listen for draw events from clients
    socket1.on('startDrawing', (data) => {
        // Broadcast the drawing data to all other clients
        socket1.broadcast.emit('startDrawing', data);
    });

    socket1.on('drawing', (data) => {
        // Broadcast the drawing data to all other clients
        socket1.broadcast.emit('drawing', data);
    });

    // Listen for the 'save' event
    socket1.on('save', (data) => {
        // Update the server-side drawing stack and current step
        drawingStack = data.drawingStack;
        currentStep = data.currentStep;

        // Broadcast the 'save' event to all other clients
        socket1.broadcast.emit('save', data);
    });

  });



server.listen(9000, () => {
    console.log('Server running at http://localhost:9000');
});
