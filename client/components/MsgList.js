import { useState, useRef, useEffect } from "react";
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import fetcher from "../fetcher.js";
import { useRouter } from "next/router";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const MsgList = () => {
  const {
    query: { userId = "" },
  } = useRouter();
  const [msgs, setMsgs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const initMsgs = async () => {
    const newMsgs = await fetcher("get", "messages", {
      params: { cursor: msgs[msgs.length - 1]?.id || "" },
    });
    if (newMsgs.length === 0) {
      setHasNext(false);
      return;
    }
    setMsgs((msgs) => [...msgs, ...newMsgs]);
  };

  useEffect(() => {
    if (intersecting && hasNext) initMsgs();
  }, [intersecting]);

  const onCreateMessage = async (text) => {
    const newMsg = await fetcher("post", "messages", { text, userId });
    setMsgs((msgs) => [newMsg, ...msgs]);
  };

  const onUpdateMessage = async (text, id) => {
    const newMsg = await fetcher("put", `/messages/${id}`, { text, userId });
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;
      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);
      return newMsgs;
    });
    doneEdit();
  };

  const doneEdit = () => setEditingId(null);

  const onDeleteMessage = async (id) => {
    const removedId = await fetcher("delete", `/messages/${id}`, {
      params: { userId },
    });
    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === removedId + "");
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
            myId={userId}
          />
        ))}
      </ul>
      <div ref={fetchMoreEl} />
    </>
  );
};

export default MsgList;
