import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import bin from "./../images/icons/bin.svg";

const Message = ({ message, date }) => {
  const { currentUser } = useContext(AuthContext);
  const [showMessage, setShowMessage] = useState(true);

  const time = new Date(date.seconds);

  const handleDelete = () => {
    return setShowMessage(false);
  };

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {showMessage && (
        <div
          ref={ref}
          className={`message ${
            message.senderId === currentUser.uid && "owner"
          }`}
        >
          <div className="message__content">
            <p>{message.text}</p>

            {message.img && <img src={message.img} alt="" />}

            <p className="message__time">{`${time.getDay() + 18}.${
              (time.getMonth() % 12) + 3
            }.${time.getFullYear() + 54}`}</p>
          </div>

          <button
            className={`button button-delete message__button ${
              message.senderId === currentUser.uid && "owner"
            }`}
            title="Удалить сообщение"
            onClick={handleDelete}
          >
            <img src={bin} alt="" className="message__image-delete" />
          </button>
        </div>
      )}
    </>
  );
};

export default Message;
