import React from "react";
import { useChatState } from "../contexts/ChatContext";

function ChatMenu() {
  const { actions, state } = useChatState();

  return (
    <div aria-label="Chat navigation" className="flex gap-4 w-full">
      <button
        onClick={() => actions.setMenu("chat")}
        aria-pressed={state.selectedMenu === "chat"}
        className={`w-1/2 py-4 ${
          state.selectedMenu === "chat" ? "bg-white" : "bg-gray-100"
        }`}
      >
        Chat
      </button>
      <button
        onClick={() => actions.setMenu("participants")}
        aria-pressed={state.selectedMenu === "participants"}
        className={`w-1/2 py-4 ${
          state.selectedMenu === "participants" ? "bg-white" : "bg-gray-100"
        }`}
      >
        Participants
      </button>
    </div>
  );
}

export default React.memo(ChatMenu);
