import { useRef } from "react";
import { socket } from "../services/socket";

const servers = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

export const useWebRTC = (roomId) => {
  const peerConnection = useRef(null);

  const createPeerConnection = (localStream, remoteVideoRef) => {
    peerConnection.current = new RTCPeerConnection(servers);

    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];

        remoteVideoRef.current
          .play()
          .catch((err) => console.log("Autoplay blocked:", err));
      }
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
        });
      }
    };

    return peerConnection.current;
  };

  return {
    peerConnection,
    createPeerConnection,
  };
};
