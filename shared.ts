// includes types that are shared between the client and server
// e.g. the websocket message protocol

export interface User {
  name: string;
  userId: string;
}

export interface ClientJoinMessage {
  type: "JOIN";
  payload: {
    username: string;
  };
}

export interface ClientLeaveMessage {
  type: "LEAVE";
  payload: {
    username: string;
  };
}

export interface ClientChatMessage {
  type: "CHAT_MESSAGE";
  payload: {
    content: string;
  };
}

export interface ClientDeleteMessage {
  type: "DELETE_MESSAGE";
  payload: {
    messageId: string;
  };
}

export interface ClientEditMessage {
  type: "EDIT_MESSAGE";
  payload: {
    messageId: string;
    content: string;
  };
}

export type ClientMessage =
  | ClientJoinMessage
  | ClientLeaveMessage
  | ClientChatMessage
  | ClientDeleteMessage
  | ClientEditMessage;

// Server messages

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: number;
  author: User;
}

export interface ServerUserJoinedMessage {
  type: "USER_JOINED";
  payload: {
    user: User;
  };
}

export interface ServerUserLeftMessage {
  type: "USER_LEFT";
  payload: {
    user: User;
  };
}

export interface ServerChatMessage {
  type: "CHAT_MESSAGE";
  payload: ChatMessage;
}

export interface ServerMessageDeletedMessage {
  type: "MESSAGE_DELETED";
  payload: {
    messageId: string;
  };
}

export interface ServerMessageEditedMessage {
  type: "MESSAGE_EDITED";
  payload: {
    messageId: string;
    content: string;
  };
}

export interface ServerUserListMessage {
  type: "USER_LIST";
  payload: {
    users: User[];
  };
}

export type ServerMessage =
  | ServerUserJoinedMessage
  | ServerUserLeftMessage
  | ServerChatMessage
  | ServerMessageDeletedMessage
  | ServerMessageEditedMessage
  | ServerUserListMessage;
