import { ChatAction, ChatState } from "../contexts/ChatContext";

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter((message) => {
          // only potentially delete chat messages, dont touch system messages
          if ("type" in message && message.type === "CHAT_MESSAGE") {
            return message.payload.id !== action.payload;
          }
          return true;
        }),
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_CONNECTED":
      return {
        ...state,
        isConnected: action.payload,
      };
    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
}
