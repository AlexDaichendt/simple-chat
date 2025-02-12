import { randomUUIDv7, type ServerWebSocket } from "bun";
import type {
  ClientMessage,
  ServerChatMessage,
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
      const userId = randomUUIDv7();
      const name = data.payload.username;

      room.userConnections.set(client, {
        name,
        userId,
      });

      const joinMessage: ServerUserJoinedMessage = {
        type: "USER_JOINED",
        payload: {
          user: {
            name,
            userId,
          },
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
  }
}
