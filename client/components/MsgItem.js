import MsgInput from "./MsgInput";

const MsgItem = ({
  id,
  userId,
  timeStamp,
  text,
  onUpdateMessage,
  onDeleteMessage,
  isEditing,
  startEdit,
  myId,
}) => (
  <li className="message_item">
    <h3>
      {userId}{" "}
      <sub>
        {new Date(timeStamp).toLocaleString("ko-Kr", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </sub>
    </h3>
    {isEditing ? (
      <>
        <MsgInput mutate={onUpdateMessage} id={id} text={text} />
      </>
    ) : (
      text
    )}

    {myId === userId && (
      <div className="messages_buttons">
        <button onClick={startEdit}>수정</button>
        <button onClick={onDeleteMessage}>삭제</button>
      </div>
    )}
  </li>
);

export default MsgItem;
