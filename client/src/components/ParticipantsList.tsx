import { useChatState } from "../contexts/ChatContext";

function ParticipantList() {
  const { state } = useChatState();

  return (
    <>
      <ul role="list" aria-label="Participants list">
        {state.participants.map((participant) => (
          <li key={participant.userId} className="p-4 border-b border-gray-200">
            {participant.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ParticipantList;
