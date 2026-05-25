import { useEffect, useRef, useState } from "react";

import { socket } from "../services/socket";
import ChatBox from "../components/chat/ChatBox";
import VideoRoom from "../components/video/VideoRoom";
import { useWebRTC } from "../hooks/useWebRTC";
import VideoControls from "../components/video/VideoControls";
import AppShell from "../layouts/AppShell";
import WorkspaceLayout from "../layouts/WorkspaceLayout";

export default function RoomPage() {
  const roomId = "test-room";
  const username = "User-" + Math.floor(Math.random() * 1000);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const localStreamRef = useRef();
  const isInitiatorRef = useRef(false);

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const { peerConnection, createPeerConnection } = useWebRTC(roomId);

  useEffect(() => {
    const setup = async () => {
      socket.connect();

      await init();

      socket.emit("join-room", {
        roomId,
        username,
      });
    };

    setup();

    socket.on("room-users", (users) => {
      setUsers(users);
    });

    socket.on("chat-history", (messages) => {
      const formatted = messages.map((msg) => ({
        id: msg.id,
        username: msg.username,
        text: msg.content,
      }));

      setMessages(formatted);
    });

    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("user-joined", async () => {
      if (!isInitiatorRef.current) return;

      const offer = await peerConnection.current.createOffer();

      await peerConnection.current.setLocalDescription(offer);

      socket.emit("offer", {
        roomId,
        offer,
      });
    });

    socket.on("offer", async (data) => {
      await peerConnection.current.setRemoteDescription(data.offer);

      const answer = await peerConnection.current.createAnswer();

      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", {
        roomId,
        answer,
      });
    });

    socket.on("answer", async (data) => {
      await peerConnection.current.setRemoteDescription(data.answer);
    });

    socket.on("ice-candidate", async (data) => {
      if (data.candidate) {
        if (peerConnection.current.remoteDescription) {
          await peerConnection.current.addIceCandidate(data.candidate);
        }
      }
    });

    socket.on("initiator", (value) => {
      isInitiatorRef.current = value;

      console.log("Is Initiator:", isInitiatorRef.current);
    });

    return () => {
      socket.off("room-users");
      socket.off("chat-history");
      socket.off("receive-message");
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("initiator");
      socket.disconnect();

      if (peerConnection.current) {
        peerConnection.current.close();
      }

      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const init = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localVideoRef.current.srcObject = stream;
    localStreamRef.current = stream;

    createPeerConnection(stream, remoteVideoRef);
  };

  const sendMessage = (message) => {
    const fullMessage = {
      ...message,
      username,
      roomId,
    };

    socket.emit("send-message", fullMessage);

    setMessages((prev) => [...prev, fullMessage]);
  };

  const toggleMute = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;

    setIsMuted(!audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;

    setIsCameraOff(!videoTrack.enabled);
  };

  const endCall = () => {
    localStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    if (peerConnection.current) {
      peerConnection.current.close();
    }

    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;

    socket.disconnect();

    setCallEnded(true);
  };
  if (callEnded) {
    return (
      <div>
        <h2>Call Ended</h2>
      </div>
    );
  }

  return (
    <AppShell>
      <WorkspaceLayout
        chatSection={
          <>
            <div
              className="
              h-16
              border-b
              border-slate-800
              flex
              items-center
              justify-between
              px-6
            "
            >
              <div>
                <h2
                  className="
                  text-lg
                  font-semibold
                "
                >
                  Team Chat
                </h2>

                <p
                  className="
                  text-sm
                  text-slate-400
                "
                >
                  {users.length} online
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <ChatBox messages={messages} onSend={sendMessage} />
            </div>
          </>
        }
        videoSection={
          <>
            <div
              className="
              flex-1
              overflow-auto
            "
            >
              <VideoRoom
                localVideoRef={localVideoRef}
                remoteVideoRef={remoteVideoRef}
              />
            </div>

            <VideoControls
              isMuted={isMuted}
              isCameraOff={isCameraOff}
              onToggleMute={toggleMute}
              onToggleCamera={toggleCamera}
              onEndCall={endCall}
            />
          </>
        }
      />
    </AppShell>
  );
}
