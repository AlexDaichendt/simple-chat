import type { ServerWebSocket } from "bun";
import type { User } from "../../shared";

export interface WebSocketData {
  roomId: string;
}

export interface Room {
  roomId: string;
  userConnections: Map<ServerWebSocket<WebSocketData>, User>;
}
