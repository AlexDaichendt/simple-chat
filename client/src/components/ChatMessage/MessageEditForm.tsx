const MessageEditForm = ({
  editContent,
  setEditContent,
  onSave,
  onCancel,
}: {
  editContent: string;
  setEditContent: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className={`max-w-[80%] ml-auto`}>
    <textarea
      value={editContent}
      onChange={(e) => setEditContent(e.target.value)}
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={2}
      autoFocus
      aria-label="Edit message content"
    />
    <div
      className={`flex gap-2 mt-2 justify-end`}
      role="group"
      aria-label="Edit message actions"
    >
      <button
        onClick={onSave}
        className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        aria-label="Save changes"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
        aria-label="Cancel editing"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default MessageEditForm;
