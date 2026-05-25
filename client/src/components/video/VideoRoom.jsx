export default function VideoRoom({ localVideoRef, remoteVideoRef }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 20,
      }}
    >
      <video ref={localVideoRef} autoPlay muted playsInline width="300" />

      <video ref={remoteVideoRef} autoPlay playsInline controls width="300" />
    </div>
  );
}
