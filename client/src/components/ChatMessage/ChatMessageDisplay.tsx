import React, { useState } from "react";
import { ChatMessage } from "../../../../shared";
import MessageHeader from "./MessageHeader";
import MessageEditForm from "./MessageEditForm";
import MessageActions from "./MessageActions";

function ChatMessageDisplay({
  message,
  userId,
  onDelete,
  onEdit,
}: {
  message: ChatMessage;
  userId: string | undefined;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string, newContent: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const isOwn = userId === message.author.userId;

  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSave = () => {
    if (editContent.trim() !== message.content) {
      onEdit(message.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  return (
    <article
      key={message.id}
      className={`${isOwn ? "ml-auto" : "mr-auto"}`}
      aria-label={`Message from ${message.author.name} on ${timestamp}`}
    >
      <MessageHeader
        author={message.author.name}
        timestamp={timestamp}
        isOwn={isOwn}
      />

      <div className="relative">
        {isEditing ? (
          <MessageEditForm
            editContent={editContent}
            setEditContent={setEditContent}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow-sm bg-gray-200
              ${isOwn ? "ml-auto rounded-tr-none" : "mr-auto rounded-tl-none"}`}
              aria-label="Message content"
            >
              {message.content}
            </div>
            {isOwn && (
              <MessageActions
                onEdit={() => setIsEditing(true)}
                onDelete={() => onDelete(message.id)}
              />
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default React.memo(ChatMessageDisplay);
