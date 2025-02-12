import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </form>
  );
}

export default React.memo(ChatInput);
