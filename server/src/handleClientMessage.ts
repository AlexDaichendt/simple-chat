import type { ServerWebSocket } from "bun";
import type { ClientMessage } from "../../shared";
import type { Room, WebSocketData } from "./types";

export default function handleClientMessage(
  client: ServerWebSocket<WebSocketData>,
  data: ClientMessage,
  room: Room,
) {
  // handle client messages
  console.log("Received new message ", data);
}
