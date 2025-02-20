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
  const { actions } = useChatState();

  // Handle incoming messages
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const message = JSON.parse(event.data) as ServerMessage;

      switch (message.type) {
        case "REGISTRATION_CONFIRMED":
          actions.setUser(message.payload.user);
          break;

        // intentional fallthrough
        case "USER_JOINED":
        case "USER_LEFT":
        case "CHAT_MESSAGE":
          actions.addMessage(message);
          break;

        case "MESSAGE_DELETED":
          actions.deleteMessage(message.payload.messageId);
          break;

        case "MESSAGE_EDITED":
          actions.editMessage(
            message.payload.messageId,
            message.payload.content,
          );
          break;

        case "USER_LIST":
          actions.setParticipants(message.payload.users);
          break;

        default:
          console.error("Unknown message type", message);
      }
    },
    [actions],
  );

  // Send a message to the server
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
