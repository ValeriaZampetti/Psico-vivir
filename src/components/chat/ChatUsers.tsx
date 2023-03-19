import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Client } from "../../interfaces/Client";

interface IProps {
  users: Client[]
}
function ChatUsers(props: IProps) {
  const [userChat, setUserChat] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // first
  
    // return () => {
    //   second
    // }
  }, [])
  

  // TODO - Arreglar overflow y eso
  return (
    <div id="chats" className="flex-[2]">
      <div
        id="userChat"
        className="p-3 flex items-center gap-3 text-white cursor-pointer
          hover:bg-secondary-strong duration-100"
      >
        <img
          className="rounded-full h-12 aspect-square object-cover"
          src="../../src/assets/mock/pic.jpg"
        />
        <div
          id="userChatInfo"
          className="h-28 hidden sm:flex items-center justify-between p-3 flex-col text-ellipsis overflow-hidden x"
        >
          <span className="font-semibold text-lg text-black ">User Name</span>
          <p className="text-sm text-gray-400 ">Si, me gustaria esodada dadadsSSAFDASFSF</p>
        </div>
      </div>
    </div>
  );
}

export default ChatUsers;
