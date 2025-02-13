import React from "react";
import { useChatState } from "../contexts/ChatContext";

interface RoomHeaderProps {
  roomId: string;
  isConnected: boolean;
}

function RoomHeader(props: RoomHeaderProps) {
  const { state } = useChatState();

  return (
    <h2 className="text-xl bg-gray-100 p-4 flex justify-between items-center">
      <span className="font-medium">Room ID: {props.roomId}</span>
      {state.currentUser && (
        <span className="font-medium">User: {state.currentUser?.name}</span>
      )}
      <span
        className={`px-3 py-1 text-sm font-medium rounded-xl ${
          props.isConnected
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {props.isConnected ? "Connected" : "Not Connected"}
      </span>
    </h2>
  );
}

export default React.memo(RoomHeader);
