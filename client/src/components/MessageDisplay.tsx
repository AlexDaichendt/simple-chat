import React from "react";
import { useChatState } from "../contexts/ChatContext";
import ChatMessage from "./ChatMessage";

function ChatMessages() {
  const { state } = useChatState();
  const userId = state.currentUser?.userId;

  return (
    <>
      {state.messages.map((message) => (
        <ChatMessage message={message} userId={userId} />
      ))}
    </>
  );
}

export default React.memo(ChatMessages);
