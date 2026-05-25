import { useMemo, useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatBox({ messages, onSend }) {
  const [message, setMessage] = useState("");

  const currentUsername = useMemo(() => {
    const myMessage = messages.find((msg) => msg.username?.startsWith("User-"));

    return myMessage?.username;
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    onSend({
      text: message,
    });

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      className="
        h-full
        flex
        flex-col
      "
    >
      {/* MESSAGE LIST */}
      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-6
          space-y-6
        "
      >
        {messages.map((msg, index) => {
          const isOwnMessage = msg.username === currentUsername;

          return (
            <div
              key={index}
              className={`
                flex
                ${isOwnMessage ? "justify-end" : "justify-start"}
              `}
            >
              <div
                className="
                  max-w-[75%]
                "
              >
                <p
                  className="
                    text-xs
                    mb-1
                  "
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  {isOwnMessage ? "You" : msg.username}
                </p>

                <div
                  className={`
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
                    shadow-sm
                    ${
                      isOwnMessage
                        ? `
                          var(--primary)
                          text-white
                        `
                        : `
                          "var(--surface-light)"
                          "var(--text)"
                        `
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <div
        className="
          border-t
          p-4
        "
        style={{
          background: "var(--bg)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="
            flex
            items-center
            gap-3
            border
            rounded-2xl
            px-4
            py-3
          "
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-sm
              placeholder:text-slate-500
            "
            style={{
              color: "var(--text)",
            }}
          />

          <button
            onClick={sendMessage}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-indigo-600
              flex
              items-center
              justify-center
              transition
            "
            style={{
              background: "var(--primary)",
            }}
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
