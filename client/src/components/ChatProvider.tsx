import React from "react";
import { ChatMessage, User } from "../../../shared";
import { ChatContext } from "../contexts/ChatContext";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider
      value={{ messages, currentUser, addMessage, setCurrentUser }}
    >
      {children}
    </ChatContext.Provider>
  );
}
