import { useEffect } from "react";
import { socket } from "../services/socket";

export default function Home() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>Socket connected successfully.</p>
    </div>
  );
}
