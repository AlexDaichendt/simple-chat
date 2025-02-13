import { useChatState } from "../contexts/ChatContext";

function ParticipantList() {
  const { state } = useChatState();

  return (
    <>
      <h3 className="text-lg font-semibold">Participants</h3>
      <ul>
        {state.participants.map((participant) => (
          <li key={participant.userId}>{participant.name}</li>
        ))}
      </ul>
    </>
  );
}

export default ParticipantList;
