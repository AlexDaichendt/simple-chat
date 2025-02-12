import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Connect from "../components/ConnectWithName";
import { useWebSocket } from "../hooks/useWebSocket";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { useChatState } from "../contexts/ChatContext";

function Room() {
  const { roomId } = useParams();
  const { isConnected, connect, sendMessage } = useWebSocket(roomId ?? "");
  const { state } = useChatState();

  return (
    <Layout>
      <section className="w-full">
        <h2 className="text-xl bg-gray-100 p-4 flex justify-between items-center rounded-md shadow-sm">
          <span className="font-medium">Room ID: {roomId}</span>
          {state.currentUser && (
            <span className="font-medium">User: {state.currentUser?.name}</span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isConnected
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isConnected ? "Connected" : "Not Connected"}
          </span>
        </h2>

        {!isConnected && <Connect onConnect={connect} />}
        {isConnected && (
          <>
            <ChatMessages />
            <ChatInput onSendMessage={sendMessage} />
          </>
        )}
      </section>
    </Layout>
  );
}

export default Room;
