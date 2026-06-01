const { saveMessage, getRoomMessages } = require("../services/messageService");
const jwt = require("jsonwebtoken");

const rooms = {};

module.exports = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = decoded;

      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);
    console.log("Authenticated:", socket.user.email);

    socket.on("join-room", async ({ roomId }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      rooms[roomId].push({
        socketId: socket.id,
        username: socket.user.name,
        userId: socket.user.id,
      });

      const isInitiator = rooms[roomId].length === 1;

      socket.emit("initiator", isInitiator);

      const messages = await getRoomMessages(roomId);

      socket.emit("chat-history", messages);

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
        userId: socket.user.id,
        username: socket.user.name,
      });

      io.to(roomId).emit("room-users", rooms[roomId]);

      console.log(`${socket.user.name} joined ${roomId}`);
    });

    socket.on("send-message", async (message) => {
      const newMessage = {
        roomId: message.roomId,
        text: message.text,

        userId: socket.user.id,
        username: socket.user.name,
      };

      await saveMessage(
        newMessage.roomId,
        newMessage.username,
        newMessage.text,
      );

      io.to(newMessage.roomId).emit("receive-message", newMessage);
    });

    socket.on("offer", (data) => {
      socket.to(data.roomId).emit("offer", data);
    });

    socket.on("answer", (data) => {
      socket.to(data.roomId).emit("answer", data);
    });

    socket.on("ice-candidate", (data) => {
      socket.to(data.roomId).emit("ice-candidate", data);
    });

    socket.on("disconnecting", () => {
      for (const roomId of socket.rooms) {
        if (rooms[roomId]) {
          rooms[roomId] = rooms[roomId].filter(
            (user) => user.socketId !== socket.id,
          );

          io.to(roomId).emit("room-users", rooms[roomId]);

          socket.to(roomId).emit("user-left", {
            socketId: socket.id,
          });
        }
      }

      console.log("Disconnected:", socket.id);
    });
  });
};
