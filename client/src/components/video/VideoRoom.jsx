export default function VideoRoom({ localVideoRef, remoteVideoRef }) {
  return (
    <div
      className="
        h-full
        flex
        flex-col
        gap-5
        p-5
      "
    >
      {/* SESSION HEADER */}
      <div>
        <p
          className="
            text-sm
          "
          style={{
            color: "var(--text-muted)",
          }}
        >
          Active Call
        </p>

        <h2
          className="
            text-lg
            font-semibold
            mt-1
          "
        >
          Team Collaboration
        </h2>
      </div>

      {/* REMOTE VIDEO */}
      <div
        className="
          flex-1
          rounded-3xl
          overflow-hidden
          border
          relative
          shadow-xl
        "
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="
            w-full
            h-full
            object-cover
            bg-black
          "
        />

        <div
          className="
            absolute
            bottom-4
            left-4
            bg-black/50
            backdrop-blur
            px-3
            py-1
            rounded-full
            text-sm
          "
        >
          Remote User
        </div>
      </div>

      {/* LOCAL VIDEO */}
      <div
        className="
          h-[160px]
          rounded-2xl
          overflow-hidden
          border
          relative
        "
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="
            w-full
            h-full
            object-cover
            bg-black
          "
        />

        <div
          className="
            absolute
            bottom-3
            left-3
            bg-black/50
            backdrop-blur
            px-3
            py-1
            rounded-full
            text-xs
          "
        >
          You
        </div>
      </div>
    </div>
  );
}
