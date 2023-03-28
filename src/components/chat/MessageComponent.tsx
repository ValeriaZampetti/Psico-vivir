import React, { useState } from "react";
import { getRelativeTimeString } from "../../helpers";
import { useAuth } from "../../hooks/useAuth";
import { Message } from "../../interfaces/Message";

interface MessageComponentProps {
  message: Message;
}

function MessageComponent(props: MessageComponentProps) {
  const { user } = useAuth();

  const owner = props.message.senderId === user?.id;

  // Refactored to show in PM or Am
  const dateString = props.message.date
    .toDate()
    .toLocaleString(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  return (
    <div id="message" className={`flex gap-2 ${owner && "flex-row-reverse"}`}>
      <section
        id="messageInfo"
        className="flex flex-col text-gray-400 items-center "
      >
        <img
          src="../../src/assets/mock/pic.jpg"
          alt="user"
          className="h-10 w-10 rounded-full"
        />
      </section>

      <section
        id="messageContent"
        className={`flex flex-col items-center gap-2 max-w-[80%] mt-5 ${
          owner && "items-end"
        }}`}
      >
        <div
          className={`bg-white py-2 px-4 rounded-xl max-w-max ${
            owner ? "rounded-tr-none" : "rounded-tl-none"
          } `}
        >
          <h1 className="break-all">{props.message.body}</h1>
          <p className="text-sm text-end mt-3 text-gray-600">{dateString}</p>
        </div>

        <img src="" alt="" className="w-[50%]" />
      </section>
    </div>
  );
}

export default MessageComponent;
