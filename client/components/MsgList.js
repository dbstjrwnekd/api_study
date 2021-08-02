import { useState } from "react";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import fetcher from "../fetcher.js";

const userIds = ["roy", "jay"];
const getRandomUserId = () => userIds[Math.round(Math.random())];

const MsgList = () => {
  const [msgs, setMsgs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initMsgs = async () => {
    const msgs = await fetcher("get", "messages");
    setMsgs(msgs);
  };

  useState(() => {
    initMsgs();
  }, []);

  const onCreateMessage = (text) => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timeStamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    };
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdateMessage = (text, id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      });
      return newMsgs;
    });
    doneEdit();
  };

  const doneEdit = () => setEditingId(null);

  const onDeleteMessage = (id) => {
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);
      return newMsgs;
    });
  };

  return (
    <>
      <MsgInput mutate={onCreateMessage} />
      <ul className="messages">
        {msgs.map((msg) => (
          <MsgItem
            key={msg.id}
            {...msg}
            onUpdateMessage={onUpdateMessage}
            onDeleteMessage={() => onDeleteMessage(msg.id)}
            startEdit={() => setEditingId(msg.id)}
            isEditing={editingId === msg.id}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
