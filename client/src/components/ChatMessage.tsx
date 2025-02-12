import React from "react";
import { ChatMessage } from "../../../shared";

function ChatMessageDisplay({
  message,
  userId,
}: {
  message: ChatMessage;
  userId: string | undefined; // pass userId as string to avoid rerendering. if we useChatState here, it would rerender every single message every time a new chat message is added.
}) {
  const isOwn = userId === message.author.userId;

  return (
    <div key={message.id} className={`mb-4 ${isOwn ? "ml-auto" : "mr-auto"}`}>
      <div
        className={`flex items-center gap-2 text-sm text-gray-600 mb-1
        ${isOwn ? "justify-end" : "justify-start"}`}
      >
        {!isOwn && <span className="font-medium">{message.author.name}</span>}
        <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
        {isOwn && <span className="font-medium">{message.author.name}</span>}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-2xl shadow-sm bg-gray-200
        ${isOwn ? "ml-auto rounded-tr-none" : "mr-auto rounded-tl-none"}`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default React.memo(ChatMessageDisplay);
