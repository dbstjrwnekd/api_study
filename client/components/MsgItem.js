const MsgItem = ({ userId, timeStamp, text }) => (
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

    {text}
  </li>
);

export default MsgItem;
