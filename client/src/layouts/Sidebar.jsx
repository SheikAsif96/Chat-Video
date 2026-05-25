import { MessageSquare, Video, Users } from "lucide-react";
import ThemeToggle from "../components/theme/ThemeToggle";

export default function Sidebar() {
  return (
    <aside
      className="
        w-64
        border-r
        flex
        flex-col
        justify-between
      "
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div>
        <div
          className="
            h-16
            px-6
            flex
            items-center
            border-b
          "
          style={{
            background: "var(--bg)",
          }}
        >
          <h1
            className="
              text-xl
              font-semibold
              tracking-tight
            "
          >
            MeetSpace
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition
            "
            style={{
              background: "var(--surface-hover)",
            }}
          >
            <MessageSquare size={18} />
            <span>Chats</span>
          </button>

          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition
            "
            style={{
              background: "var(--surface-hover)",
            }}
          >
            <Video size={18} />
            <span>Calls</span>
          </button>

          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              hover:bg-slate-900
              transition
            "
          >
            <Users size={18} />
            <span>Participants</span>
          </button>
        </nav>
      </div>

      <div
        className="
    p-4
    border-t
    flex
    items-center
    justify-between
    gap-3
  "
        style={{
          border: "var(--border)",
        }}
      >
        <div
          className="
            rounded-xl
            p-3
            flex-1
            "
          style={{
            background: "var(--surface)",
          }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Current Room
          </p>

          <p className="mt-1 text-sm font-medium">test-room</p>
        </div>

        <ThemeToggle />
      </div>
    </aside>
  );
}
