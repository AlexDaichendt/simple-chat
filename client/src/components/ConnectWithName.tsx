import React, { useState } from "react";
import { useChatState } from "../contexts/ChatContext";

interface ConnectProps {
  onConnect: (name: string) => void;
}

function Connect({ onConnect }: ConnectProps) {
  const { setCurrentUser } = useChatState();
  const [name, setName] = useState("");

  function handleConnect() {
    if (!name) {
      return;
    }

    // leave userId empty for now, it is server generated
    setCurrentUser({ name, userId: "" });
    onConnect(name);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && name) {
      handleConnect();
    }
  }

  return (
    <div className="flex gap-4 mt-4">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button onClick={handleConnect} disabled={!name} className="btn">
        Connect
      </button>
    </div>
  );
}

export default React.memo(Connect);
