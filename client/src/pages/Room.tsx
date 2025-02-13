import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Connect from "../components/ConnectWithName";
import { useWebSocket } from "../hooks/useWebSocket";
import ChatMessages from "../components/MessageDisplay";
import ChatInput from "../components/ChatInput";
import { useChatState } from "../contexts/ChatContext";
import ParticipantList from "../components/ParticipantsList";
import ChatMenu from "../components/ChatMenu";
import RoomHeader from "../components/RoomHeader";

function Room() {
  const { roomId } = useParams(); // can never be null as this Room component is only ever rendered if react-router matches the route WITH a roomId
  const { isConnected, connect, sendMessage } = useWebSocket(roomId ?? "");
  const { state } = useChatState();

  if (!isConnected) {
    return (
      <Layout>
        <section className="w-full">
          <RoomHeader roomId={roomId!} isConnected={isConnected} />
          <Connect onConnect={connect} />
        </section>
      </Layout>
    );
  }

  // is connected
  return (
    <Layout>
      <section className="w-full">
        <RoomHeader roomId={roomId!} isConnected={isConnected} />

        <ChatMenu />
        {state.selectedMenu === "chat" && (
          <>
            <ChatMessages sendMessage={sendMessage} />
            <ChatInput sendMessage={sendMessage} />
          </>
        )}

        {state.selectedMenu === "participants" && <ParticipantList />}
      </section>
    </Layout>
  );
}

export default Room;
