export default function VideoControls({
  isMuted,
  isCameraOff,
  onToggleMute,
  onToggleCamera,
  onEndCall,
}) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
      <button onClick={onToggleMute}>{isMuted ? "unMute" : "Mute"}</button>

      <button onClick={onToggleCamera}>
        {isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
      </button>

      <button onClick={onEndCall}>End Call</button>
    </div>
  );
}
