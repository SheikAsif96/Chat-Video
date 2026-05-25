import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ChatBox({ messages, onSend }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    onSend({
      id: uuidv4(),
      text: message,
      createdAt: new Date(),
    });

    setMessage("");
  };

  return (
    <div>
      <h3>Chat</h3>

      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.username}: </strong>
            {msg.text}
          </div>
        ))}
      </div>

      <input value={message} onChange={(e) => setMessage(e.target.value)} />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
