import React from "react";
import { ChatMessage } from "../../../shared";

function ChatMessageDisplay({
  message,
  userId,
  onDelete,
  onEdit,
}: {
  message: ChatMessage;
  userId: string | undefined;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string) => void;
}) {
  const isOwn = userId === message.author.userId;
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div key={message.id} className={`mb-4 ${isOwn ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`flex items-center gap-2 text-sm text-gray-600 mb-1
        ${isOwn ? "justify-end" : "justify-start"}`}
      >
        {!isOwn && (
          <span className="font-bold text-gray-700">{message.author.name}</span>
        )}
        <span className="font-medium opacity-45">{timestamp}</span>
        {isOwn && (
          <span className="font-bold text-gray-700">{message.author.name}</span>
        )}
      </div>
      <div className="relative">
        <div
          className={`max-w-[80%] p-3 rounded-2xl shadow-sm bg-gray-200
          ${isOwn ? "ml-auto rounded-tr-none" : "mr-auto rounded-tl-none"}`}
        >
          {message.content}
        </div>
        {isOwn && (
          <div
            className={`flex gap-2 mt-0.5 text-[10px]
            ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <button
              onClick={() => onEdit?.(message.id)}
              className="text-blue-600 hover:text-blue-800 active:text-blue-900"
            >
              Edit
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => onDelete?.(message.id)}
              className="text-red-600 hover:text-red-800 active:text-red-900"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ChatMessageDisplay);
