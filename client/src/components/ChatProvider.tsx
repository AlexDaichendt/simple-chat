import React, { useReducer } from "react";
import { User } from "../../../shared";
import { ChatContext, ChatState, Message } from "../contexts/ChatContext";
import { chatReducer } from "../reducers/chatReducers";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    currentUser: null,
    isConnected: false,
    participants: [],
    selectedMenu: "chat",
  });

  const value = {
    state,
    dispatch,
    actions: {
      editMessage: (messageId: string, newContent: string) =>
        dispatch({ type: "EDIT_MESSAGE", payload: { messageId, newContent } }),
      deleteMessage: (messageId: string) =>
        dispatch({ type: "DELETE_MESSAGE", payload: messageId }),
      addMessage: (message: Message) =>
        dispatch({ type: "ADD_MESSAGE", payload: message }),
      setUser: (user: User) => dispatch({ type: "SET_USER", payload: user }),
      setConnected: (isConnected: boolean) =>
        dispatch({ type: "SET_CONNECTED", payload: isConnected }),
      setParticipants: (participants: User[]) =>
        dispatch({ type: "SET_PARTICIPANTS", payload: participants }),
      setMenu: (menu: ChatState["selectedMenu"]) =>
        dispatch({ type: "SET_MENU", payload: menu }),
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
