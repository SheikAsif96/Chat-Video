const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const socketHandler = require("./sockets");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL },
});

socketHandler(io);

module.exports = server;
