import React, { useEffect, useRef } from "react";
import { ServerMessage } from "../../../shared";
import { useChatState } from "../contexts/ChatContext";
import ChatMessage from "./ChatMessage";

function ChatMessages() {
  const { state } = useChatState();
  const userId = state.currentUser?.userId;
  const messagesEndRef = useRef<HTMLDivElement>(null); // ref to an empty div at the end to scroll to

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  function renderMessage(message: ServerMessage) {
    switch (message.type) {
      case "CHAT_MESSAGE":
        return (
          <ChatMessage
            message={message.payload}
            userId={userId}
            key={message.payload.id}
          />
        );
      case "USER_JOINED":
        return (
          <div
            className="text-center text-gray-500 my-2"
            key={`join-${message.payload.user.name}-${new Date()}`}
          >
            {message.payload.user.name} joined!
          </div>
        );
      case "USER_LEFT":
        return (
          <div
            className="text-center text-gray-500 my-2"
            key={`leave-${message.payload.user.name}-${new Date()}`}
          >
            {message.payload.user.name} left!
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-[calc(100vh-theme('spacing.48'))] overflow-y-auto p-4">
      {state.messages.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default React.memo(ChatMessages);
