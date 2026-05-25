import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  return (
    <div
      className="
        h-screen
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
