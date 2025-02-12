import React from "react";
import { ServerMessage } from "../../../shared";
import { useChatState } from "../contexts/ChatContext";
import ChatMessage from "./ChatMessage";

function ChatMessages() {
  const { state } = useChatState();
  const userId = state.currentUser?.userId;

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

  return <>{state.messages.map(renderMessage)}</>;
}

export default React.memo(ChatMessages);
