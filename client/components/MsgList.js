import { useState } from "react";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

const userIds = ["roy", "jay"];
const getRandomUserId = () => userIds[Math.round(Math.random())];

const originalMsgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: 50 - i,
    userId: getRandomUserId(),
    timeStamp: 1234567890123 + i * 1000 * 60,
    text: `${i + 1} mock text`,
  }));

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs);
  const onCreate = (text) => {
    const newMsg = {
      id: msgs.length,
      userId: getRandomUserId(),
      timeStamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((x) => (
          <MsgItem key={x.id} {...x} />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
