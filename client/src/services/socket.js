import { io } from "socket.io-client";
const SERVER_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(SERVER_URL, {
  autoConnect: false,
});

export const connectSocket = () => {
  socket.auth = {
    token: localStorage.getItem("token"),
  };

  socket.connect();
};
