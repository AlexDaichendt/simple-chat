const MessageHeader = ({
  author,
  timestamp,
  isOwn,
}: {
  author: string;
  timestamp: string;
  isOwn: boolean;
}) => (
  <div
    className={`flex items-center gap-2 text-sm text-gray-600 mb-1
    ${isOwn ? "justify-end" : "justify-start"}`}
  >
    {!isOwn && <span className="font-bold text-gray-700">{author}</span>}
    <span className="font-medium opacity-45">{timestamp}</span>
    {isOwn && <span className="font-bold text-gray-700">{author}</span>}
  </div>
);

export default MessageHeader;
