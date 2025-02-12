import { createContext, useContext } from "react";
import { ChatMessage, User } from "../../../shared";

interface ChatContextType {
  messages: ChatMessage[];
  currentUser: User | null;
  addMessage: (message: ChatMessage) => void;
  setCurrentUser: (user: User) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatState = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
