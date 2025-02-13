import React, { useEffect, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  ClientDeleteMessage,
  ClientEditMessage,
  ClientMessage,
} from "../../../shared";
import { useChatState } from "../contexts/ChatContext";
import ChatMessageDisplay from "./ChatMessage/ChatMessageDisplay";

interface MessageDisplayProps {
  sendMessage: (message: ClientMessage) => void;
}

function MessageDisplay({ sendMessage }: MessageDisplayProps) {
  const { state } = useChatState();
  const userId = state.currentUser?.userId;
  const listRef = useRef<List>(null);

  const onDelete = (messageId: string) => {
    const deleteMessage: ClientDeleteMessage = {
      type: "DELETE_MESSAGE",
      payload: { messageId },
    };
    sendMessage(deleteMessage);
  };

  const onEdit = (messageId: string, newContent: string) => {
    const editMessage: ClientEditMessage = {
      type: "EDIT_MESSAGE",
      payload: {
        messageId,
        content: newContent,
      },
    };
    sendMessage(editMessage);
  };

  useEffect(() => {
    if (listRef.current) {
      // Scroll to bottom when messages change
      listRef.current.scrollToItem(state.messages.length - 1);
    }
  }, [state.messages]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const message = state.messages[index];

    switch (message.type) {
      case "CHAT_MESSAGE":
        return (
          <div style={style}>
            <ChatMessageDisplay
              message={message.payload}
              userId={userId}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        );
      case "USER_JOINED":
        return (
          <div style={style} className="text-center text-gray-500 my-2">
            {message.payload.user.name} joined!
          </div>
        );
      case "USER_LEFT":
        return (
          <div style={style} className="text-center text-gray-500 my-2">
            {message.payload.user.name} left!
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-theme('spacing.64'))]">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={state.messages.length}
            itemSize={90} // sadly, this will make the system messages really tall. apparently its non trivial to fix that
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}

export default React.memo(MessageDisplay);
