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
          border-slate-800
          flex
          flex-col
          bg-slate-950
        "
      >
        {chatSection}
      </section>

      {/* VIDEO SECTION */}
      <section
        className="
          w-[420px]
          bg-slate-900/40
          flex
          flex-col
        "
      >
        {videoSection}
      </section>
    </div>
  );
}
