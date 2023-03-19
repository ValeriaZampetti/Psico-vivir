import React, { useState } from "react";

function Message() {
  const [owner, setOwner] = useState(true);
  return (
    <div
      id="message"
      className={`flex gap-2 mb-5 ${owner && "flex-row-reverse"}`}
    >
      <section
        id="messageInfo"
        className="flex flex-col text-gray-400 items-center "
      >
        <img
          src="../../src/assets/mock/pic.jpg"
          alt="user"
          className="h-10 w-10 rounded-full"
        />
        <p className="text-sm">Hace 5 minutos</p>
      </section>

      <section
        id="messageContent"
        className={`flex flex-col items-center gap-2 max-w-[80%] mt-5 ${
          owner && "items-end"
        }}`}
      >
        <p
          className={`bg-white py-2 px-4 rounded-xl max-w-max ${
            owner ? "rounded-tr-none" : "rounded-tl-none"
          } `}
        >
          HOLAAAAAAA PAPORRUCO
        </p>
        <img src="" alt="" className="w-[50%]" />
      </section>
    </div>
  );
}

export default Message;
