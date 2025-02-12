import { createContext, useContext, Dispatch } from "react";
import { ChatMessage, User } from "../../../shared";

export type ChatState = {
  messages: ChatMessage[];
  currentUser: User | null;
  isConnected: boolean;
};

export type ChatAction =
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "SET_USER"; payload: User }
  | { type: "SET_CONNECTED"; payload: boolean }
  | { type: "CLEAR_MESSAGES" };

export type ChatActions = {
  addMessage: (message: ChatMessage) => void;
  setUser: (user: User) => void;
  setConnected: (isConnected: boolean) => void;
};

interface ChatContextType {
  state: ChatState;
  dispatch: Dispatch<ChatAction>;
  actions: ChatActions;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatState = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatState must be used within ChatProvider");
  }
  return context;
};

export const useCurrentUser = () => {
  const { state } = useChatState();
  return state.currentUser;
};
