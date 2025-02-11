import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  function onClickCreateRoom() {
    const roomId = Math.random().toString(36).substring(7);
    navigate(`/room/${roomId}`);
  }

  function onClickJoinRoom() {
    if (!roomId) {
      return;
    }
    navigate(`/room/${roomId}`);
  }

  return (
    <Layout>
      <section className="max-w-md mx-auto">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create a new Room
          </h2>
          <button
            type="button"
            onClick={onClickCreateRoom}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>

        <div className="space-y-4 mt-16">
          <h2 className="text-2xl font-semibold text-gray-800">
            Join Existing Room
          </h2>
          <label
            htmlFor="roomId"
            className="block text-sm font-medium text-gray-700"
          >
            Room ID:
          </label>
          <input
            id="roomId"
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={onClickJoinRoom}
            disabled={!roomId}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
