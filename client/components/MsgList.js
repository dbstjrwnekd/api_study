import MsgItem from "./MsgItem";

const userIds = ["roy", "jay"];
const getRandomUserId = () => userIds[Math.round(Math.random())];

const msgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: 50 - i,
    userId: getRandomUserId(),
    timeStamp: 1234567890123 + i * 1000 * 60,
    text: `${i + 1} mock text`,
  }));

const MsgList = () => (
  <ul className="messages">
    {msgs.map((x) => (
      <MsgItem key={x.id} {...x} />
    ))}
  </ul>
);

export default MsgList;
