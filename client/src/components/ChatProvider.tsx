import React, { useReducer } from "react";
import { User } from "../../../shared";
import { ChatContext, Message } from "../contexts/ChatContext";
import { chatReducer } from "../reducers/chatReducers";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    currentUser: null,
    isConnected: false,
  });

  const value = {
    state,
    dispatch,
    actions: {
      deleteMessage: (messageId: string) =>
        dispatch({ type: "DELETE_MESSAGE", payload: messageId }),
      addMessage: (message: Message) =>
        dispatch({ type: "ADD_MESSAGE", payload: message }),
      setUser: (user: User) => dispatch({ type: "SET_USER", payload: user }),
      setConnected: (isConnected: boolean) =>
        dispatch({ type: "SET_CONNECTED", payload: isConnected }),
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
