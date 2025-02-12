import React from "react";
import { useChatState } from "../contexts/ChatContext";

function ChatMessages() {
  const { messages } = useChatState();

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <div>
            <span>{message.author.name}</span>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
          <div>{message.content}</div>
        </div>
      ))}
    </>
  );
}

export default React.memo(ChatMessages);
