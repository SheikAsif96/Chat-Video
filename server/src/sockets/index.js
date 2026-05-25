const { saveMessage, getRoomMessages } = require("../services/messageService");

const rooms = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join-room", async ({ roomId, username }) => {
      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      rooms[roomId].push({
        socketId: socket.id,
        username,
      });

      const isInitiator = rooms[roomId].length === 1;

      socket.emit("initiator", isInitiator);

      const messages = await getRoomMessages(roomId);

      socket.emit("chat-history", messages);

      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
        username,
      });

      io.to(roomId).emit("room-users", rooms[roomId]);

      console.log(`${username} joined ${roomId}`);
    });

    socket.on("send-message", async (data) => {
      await saveMessage(data);
      io.to(data.roomId).emit("receive-message", data);
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
