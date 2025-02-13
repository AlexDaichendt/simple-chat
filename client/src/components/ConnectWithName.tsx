import React, { useState } from "react";
import { useChatState } from "../contexts/ChatContext";

interface ConnectProps {
  onConnect: (name: string) => void;
}

function Connect({ onConnect }: ConnectProps) {
  const { actions } = useChatState();
  const [name, setName] = useState("");

  function handleConnect() {
    if (!name) {
      return;
    }

    actions.setUser({
      name: name,
      userId: "", // leave userId empty for now, it is server generated and inserted by the REGISTRATION_CONFIRMED message
    });

    onConnect(name);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && name) {
      handleConnect();
    }
  }

  return (
    <div className="flex gap-4 mt-4" role="form" aria-label="Connect to chat">
      <label htmlFor="username-input" className="sr-only">
        Enter your name
      </label>
      <input
        id="username-input"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-required="true"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleConnect}
        disabled={!name}
        className="btn"
        aria-label="Connect to chat room"
      >
        Connect
      </button>
    </div>
  );
}

export default React.memo(Connect);
