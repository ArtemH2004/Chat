import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

import more from "./../images/icons/more.svg";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
    <header className="chat__header">
      <div className="chat__username">
        <p>{data.user?.displayName}</p>
      </div>

      <button className="chat__button button button-icon" title="Подробнее">
        <img
          src={more}
          alt="Подробнее"
          className="chat__more"
          title="Подробнее"
        />
      </button>
    </header>

    <Messages />

    <Input />
  </div>
  );
};

export default Chat;
