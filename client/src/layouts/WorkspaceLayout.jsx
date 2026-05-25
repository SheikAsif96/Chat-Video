export default function WorkspaceLayout({ chatSection, videoSection }) {
  return (
    <div
      className="
        flex-1
        flex
        overflow-hidden
      "
    >
      {/* CHAT SECTION */}
      <section
        className="
          flex-1
          border-r
          flex
          flex-col
        "
        style={{
          background: "var(--bg)",
          borderColor: "var(--border)",
        }}
      >
        {chatSection}
      </section>

      {/* VIDEO SECTION */}
      <section
        className="
          w-[420px]
          flex
          flex-col
        "
        style={{
          background: "var(--bg)",
        }}
      >
        {videoSection}
      </section>
    </div>
  );
}
