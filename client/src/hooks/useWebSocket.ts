import { useCallback, useEffect, useState } from "react";
import { ClientJoinMessage, ClientMessage } from "../../../shared";

export function useWebSocket(roomId: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Send a message to the server, useCallback to avoid unnecessary re-renders for components using this hook
  const sendMessage = useCallback(
    (message: ClientMessage) => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      } else {
        console.error("WebSocket connection not established");
      }
    },
    [ws],
  );

  const connect = useCallback(
    (name: string) => {
      try {
        const websocket = new WebSocket(`/ws/room/${roomId}`);
        console.log("Connecting to WebSocket server...");

        websocket.onopen = () => {
          console.log("WebSocket connection established to room:", roomId);
          setIsConnected(true);
          const message: ClientJoinMessage = {
            type: "JOIN",
            payload: {
              username: name,
            },
          };
          websocket.send(JSON.stringify(message));
        };

        websocket.onclose = () => {
          console.log("WebSocket connection closed to room:", roomId);
          setIsConnected(false);
          setWs(null);
        };

        websocket.onerror = (error) => {
          console.error("WebSocket error:", error);
          setIsConnected(false);
        };

        setWs(websocket);
      } catch (error) {
        console.error("Failed to create WebSocket connection:", error);
        setIsConnected(false);
      }
    },
    [roomId],
  );

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return { ws, isConnected, connect, sendMessage };
}
