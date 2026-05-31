import { io } from "socket.io-client";
import { API_URL } from "../config/env";

export const socket = io(API_URL, {
  autoConnect: false,
});

export const connectSocket = () => {
  socket.auth = {
    token: localStorage.getItem("token"),
  };

  socket.connect();
};
