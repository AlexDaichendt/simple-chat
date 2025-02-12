import { randomUUIDv7, type ServerWebSocket } from "bun";
import type {
  ClientMessage,
  ServerChatMessage,
  ServerMessageDeletedMessage,
  ServerMessageEditedMessage,
  ServerRegistrationConfirmed,
  ServerUserJoinedMessage,
  User,
} from "../../shared";
import type { Room, WebSocketData } from "./types";

export default function handleClientMessage(
  client: ServerWebSocket<WebSocketData>,
  data: ClientMessage,
  room: Room,
  sender: User | undefined,
) {
  // handle client messages
  console.log("Received new message ", data);

  switch (data.type) {
    case "JOIN":
      const user = {
        name: data.payload.username,
        userId: randomUUIDv7(),
      };
      room.userConnections.set(client, user);

      const registrationConfirm: ServerRegistrationConfirmed = {
        type: "REGISTRATION_CONFIRMED",
        payload: { user },
      };
      client.send(JSON.stringify(registrationConfirm));

      // notify everyone else that a new user has joined
      const joinMessage: ServerUserJoinedMessage = {
        type: "USER_JOINED",
        payload: {
          user,
        },
      };

      for (const [socket] of room.userConnections) {
        socket.send(JSON.stringify(joinMessage));
      }

      break;

    case "CHAT_MESSAGE":
      const chatMessage: ServerChatMessage = {
        type: "CHAT_MESSAGE",
        payload: {
          id: randomUUIDv7(),
          author: sender!,
          content: data.payload.content,
          timestamp: Date.now(),
        },
      };

      // broadcast the message to all clients in the room
      for (const [socket] of room.userConnections) {
        socket.send(JSON.stringify(chatMessage));
      }
      break;

    case "DELETE_MESSAGE":
      // verify that the sender is the author of the message
      // TODO: implement this, would need to store all messages on the server side

      const deleteMessage: ServerMessageDeletedMessage = {
        type: "MESSAGE_DELETED",
        payload: {
          messageId: data.payload.messageId,
        },
      };

      for (const [socket] of room.userConnections) {
        socket.send(JSON.stringify(deleteMessage));
      }
      break;

    case "EDIT_MESSAGE":
      // verify that the sender is the author of the message
      // TODO: implement this, would need to store all messages on the server side
      const editMessage: ServerMessageEditedMessage = {
        type: "MESSAGE_EDITED",
        payload: {
          messageId: data.payload.messageId,
          content: data.payload.content,
        },
      };

      for (const [socket] of room.userConnections) {
        socket.send(JSON.stringify(editMessage));
      }
      break;

    default:
      console.error("Unknown message type", data);
  }
}
