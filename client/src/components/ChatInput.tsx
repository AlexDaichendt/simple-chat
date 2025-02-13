import React, { useState } from "react";
import { ClientChatMessage, ClientMessage } from "../../../shared";

interface ChatInputProps {
  sendMessage: (message: ClientMessage) => void;
}

function ChatInput({ sendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    const chatMessage: ClientChatMessage = {
      type: "CHAT_MESSAGE",
      payload: {
        content: message,
      },
    };

    sendMessage(chatMessage);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="chat-input" className="sr-only">
        Type a message
      </label>
      <input
        id="chat-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message" // this message is more descriptive than a simple "Message", therefore better for accessibility
        aria-label="Chat message input"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </form>
  );
}

export default React.memo(ChatInput);
