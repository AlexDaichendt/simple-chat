import type {
  ClientMessage,
  ServerUserLeftMessage,
  ServerUserListMessage,
} from "../../shared.ts";
import handleClientMessage from "./handleClientMessage.ts";
import type { Room, WebSocketData } from "./types.ts";

const rooms = new Map<string, Room>(); // roomId -> Room

const server = Bun.serve<WebSocketData>({
  port: 3000,

  async fetch(request, server) {
    // check if not a websocket request
    if (!request.headers.get("Upgrade")) {
      return new Response("Only Websocket Connections supported", {
        status: 200,
      });
    }

    // extract the roomId out of the URL
    const url = new URL(request.url);
    const matches = url.pathname.match(/^\/ws\/room\/(.+)$/);

    if (!matches) {
      return new Response("Invalid room URL format", { status: 400 });
    }

    const roomId = matches[1];

    // pass it to on as data attr
    if (
      server.upgrade(request, {
        data: { roomId },
      })
    ) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    open(ws) {
      const roomId = ws.data.roomId;

      if (!roomId) {
        console.log("Error: RoomId cannot be empty");
        ws.close();
        return;
      }

      if (!rooms.has(roomId)) {
        console.log(`Creating room: ${roomId}`);
        rooms.set(roomId, {
          roomId,
          userConnections: new Map(),
        });
      }
    },
    close(ws) {
      // cleanup, delete room if empty
      const roomId = ws.data.roomId;
      const room = rooms.get(roomId);

      if (!room) {
        return;
      }

      const sender = room.userConnections.get(ws);

      if (sender) {
        // notify other clients that a client has left
        const leaveMessage: ServerUserLeftMessage = {
          type: "USER_LEFT",
          payload: {
            user: sender,
          },
        };

        for (const [socket] of room.userConnections) {
          socket.send(JSON.stringify(leaveMessage));
        }
      }

      room.userConnections.delete(ws);

      // send updated user list
      const userArray = Array.from(room.userConnections.values());
      const userListMessage: ServerUserListMessage = {
        type: "USER_LIST",
        payload: {
          users: userArray,
        },
      };

      for (const [socket] of room.userConnections) {
        socket.send(JSON.stringify(userListMessage));
      }

      if (room.userConnections.size === 0) {
        rooms.delete(roomId);
        console.log("Cleaned up room", roomId);
      }
    },
    message(ws, message) {
      const roomId = ws.data.roomId;
      const room = rooms.get(roomId);

      if (!room) {
        console.log(`Room not found: ${roomId}`);
        return;
      }

      const data = JSON.parse(message.toString()) as ClientMessage;

      const sender = room.userConnections.get(ws);

      if (!sender && data.type !== "JOIN") {
        console.log("User not found in room", roomId);
        return;
      }

      handleClientMessage(ws, data, room, sender);
    },
  },
});
console.log(`Server running at ${server.url}`);
