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
            border-slate-800
          "
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
              
              hover:bg-slate-800
              transition
            "
            style={{
              background: "var(--surface-light)",
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
              hover:bg-slate-900
              transition
            "
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
    border-slate-800
    flex
    items-center
    justify-between
    gap-3
  "
      >
        <div
          className="
      bg-slate-900
      rounded-xl
      p-3
      flex-1
    "
        >
          <p className="text-xs text-slate-400">Current Room</p>

          <p className="mt-1 text-sm font-medium">test-room</p>
        </div>

        <ThemeToggle />
      </div>
    </aside>
  );
}
