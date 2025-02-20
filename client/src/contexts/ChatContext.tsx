import { createContext, useContext, Dispatch } from "react";
import {
  ServerChatMessage,
  ServerUserJoinedMessage,
  ServerUserLeftMessage,
  User,
} from "../../../shared";

export type Message =
  | ServerChatMessage
  | ServerUserJoinedMessage
  | ServerUserLeftMessage;

export type ChatState = {
  messages: Message[];
  currentUser: User | null;
  isConnected: boolean;
  participants: User[];
  selectedMenu: "chat" | "participants";
};

export type ChatAction =
  | { type: "EDIT_MESSAGE"; payload: { messageId: string; newContent: string } }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "DELETE_MESSAGE"; payload: string }
  | { type: "SET_USER"; payload: User }
  | { type: "SET_CONNECTED"; payload: boolean }
  | { type: "CLEAR_MESSAGES" }
  | { type: "SET_PARTICIPANTS"; payload: User[] }
  | { type: "SET_MENU"; payload: ChatState["selectedMenu"] };

export type ChatActions = {
  editMessage: (messageId: string, newContent: string) => void;
  addMessage: (message: Message) => void;
  deleteMessage: (messageId: string) => void;
  setUser: (user: User) => void;
  setConnected: (isConnected: boolean) => void;
  setParticipants: (participants: User[]) => void;
  setMenu: (menu: ChatState["selectedMenu"]) => void;
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
