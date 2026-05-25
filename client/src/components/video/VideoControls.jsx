import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

export default function VideoControls({
  isMuted,
  isCameraOff,
  onToggleMute,
  onToggleCamera,
  onEndCall,
}) {
  return (
    <div
      className="
        border-t
        border-slate-800
        px-5
        py-5
        bg-slate-950/80
        backdrop-blur
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          gap-4
        "
      >
        {/* MIC */}
        <button
          onClick={onToggleMute}
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            transition-all
            duration-200
            border
            ${
              isMuted
                ? `
                  bg-red-500/20
                  border-red-500/30
                  text-red-400
                `
                : `
                  var(--surface-light)
                  border-slate-800
                `
            }
          `}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* CAMERA */}
        <button
          onClick={onToggleCamera}
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            transition-all
            duration-200
            border
            ${
              isCameraOff
                ? `
                  bg-red-500/20
                  border-red-500/30
                  text-red-400
                `
                : `
                  var(--surface-light)
                  border-slate-800
                `
            }
          `}
        >
          {isCameraOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        {/* END CALL */}
        <button
          onClick={onEndCall}
          className="
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            bg-red-500
            hover:bg-red-600
            transition-all
            duration-200
            shadow-lg
          "
        >
          <PhoneOff size={20} />
        </button>
      </div>
    </div>
  );
}
