import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <div
      className="
        h-screen
        text-slate-100
        flex
        overflow-hidden
      "
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Sidebar />

      <main
        className="
          flex-1
          flex
          flex-col
        "
      >
        {children}
      </main>
    </div>
  );
}
