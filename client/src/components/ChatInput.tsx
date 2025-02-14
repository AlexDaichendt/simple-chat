import React, { useState } from "react";
import { ClientChatMessage, ClientMessage } from "../../../shared";
import EmojiPicker from "./EmojiPicker";

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

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  // this is required as otherwise pressing enter will open the emoji picker and not submit the message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Type a message
        </label>
        <input
          id="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          aria-label="Chat message input"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <EmojiPicker onEmojiClick={handleEmojiSelect} />
      </div>
    </form>
  );
}

export default React.memo(ChatInput);
