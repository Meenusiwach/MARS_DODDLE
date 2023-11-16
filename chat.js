const http = require("http");
const express = require('express');


const path = require("path");
// const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("user-message",(message)=> {
io.emit("message",message);

    });
  });



app.use(express.static(path.resolve("./pchat")));
app.get("/", (req, res) => {
  return res.sendFile("/pchat/index.html");
});

server.listen(9000, () => {
  console.log('server running at port:9000');
});