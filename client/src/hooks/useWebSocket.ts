import { useCallback, useEffect, useState } from "react";
import {
  ClientJoinMessage,
  ClientMessage,
  ServerMessage,
} from "../../../shared";
import { useChatState } from "../contexts/ChatContext";

export function useWebSocket(roomId: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { state, actions } = useChatState();

  // Handle incoming messages
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message = JSON.parse(event.data) as ServerMessage;

      switch (message.type) {
        case "USER_JOINED":
          console.log("User joined", message.payload);
          if (message.payload.user.name === state.currentUser?.name) {
            actions.setUser(message.payload.user);
          }
          break;
        case "CHAT_MESSAGE":
          actions.addMessage(message.payload);
          break;
        default:
          console.error("Unknown message type", message);
      }
    },
    [state.currentUser, actions],
  );

  // Send a message to the server
  const sendMessage = useCallback(
    (content: string) => {
      if (ws?.readyState === WebSocket.OPEN) {
        const message: ClientMessage = {
          type: "CHAT_MESSAGE",
          payload: { content },
        };
        ws.send(JSON.stringify(message));
      } else {
        console.error("WebSocket connection not established");
      }
    },
    [ws],
  );

  // Connect to WebSocket server
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

        websocket.onmessage = handleMessage;

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
    [roomId, handleMessage],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
      setIsConnected(false);
    };
  }, [ws]);

  return { isConnected, connect, sendMessage };
}
