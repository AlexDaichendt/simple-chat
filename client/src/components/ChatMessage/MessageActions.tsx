const MessageActions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div
    className={`flex gap-2 mt-0.5 text-[10px] justify-end`}
    aria-label="Message actions"
  >
    <button
      onClick={onEdit}
      className="text-blue-600 hover:text-blue-800 active:text-blue-900"
      aria-label="Edit message"
      title="Edit message"
    >
      Edit
    </button>
    <span className="text-gray-400" aria-hidden="true">
      •
    </span>
    <button
      onClick={onDelete}
      className="text-red-600 hover:text-red-800 active:text-red-900"
      aria-label="Delete message"
      title="Delete message"
    >
      Delete
    </button>
  </div>
);

export default MessageActions;
