import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Connect from "../components/Connect";
import { useWebSocket } from "../hooks/useWebSocket";

function Room() {
  const { roomId } = useParams();
  const { isConnected, connect } = useWebSocket(roomId ?? "");

  return (
    <Layout>
      <section className="w-full">
        <h2 className="text-xl bg-gray-100 p-4 flex justify-between items-center rounded-md shadow-sm">
          <span className="font-medium">Room ID: {roomId}</span>
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
      </section>
    </Layout>
  );
}

export default Room;
