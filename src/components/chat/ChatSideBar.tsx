import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { Client, Doctor } from "../../interfaces/Client";
import SearchBar from "../forms/SearchBar";
import UsersToChat from "./UsersToChat";
import List from "../../assets/icons/list.svg";
import ListCheck from "../../assets/icons/list-check.svg";

function ChatSideBar() {
  const [search, setSearch] = useState<string>("");

  const [activeChatsDisplay, setActiveChatsDisplay] = useState<boolean>(true);
  const [activeChats, setActiveChats] = useState<Client[] | Doctor[]>([]);
  const [inactiveChats, setInactiveChats] = useState<Client[] | Doctor[]>([]);

  const { usersActive, usersInactive } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    setActiveChats(usersActive);

    setInactiveChats(usersInactive);
  }, [usersActive, usersInactive]);

  useEffect(() => {}, [activeChatsDisplay]);

  function handleSearchChange(value: string) {
    setSearch(value);
    if (activeChatsDisplay) {
      const filteredClients = activeChats.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setActiveChats(filteredClients);
    } else {
      const filteredClients = inactiveChats.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setInactiveChats(filteredClients);
    }
  }

  return (
    <div className="flex-1 border-gray-400 border-r-2 bg-secondary-normal">
      <section id="navbar" className="flex items-center bg-secondary-strong">
        <div className="flex gap-3 h-28 p-3 justify-between">
          <img
            src="../../src/assets/mock/pic.jpg"
            alt="profile-pic"
            className="h-20 aspect-square rounded-full self-center max-[900px]:hidden"
          />
          <h1
            className="text-black text-2xl font-semibold self-center text-center 
            text-ellipsis overflow-hidden "
          >
            {user?.name}
          </h1>
        </div>
      </section>

      <section className="h-12 flex justify-between items-center ">
        <div className="flex w-full py-4">
          <button
            className={`${
              activeChatsDisplay
                ? "bg-primary-strong border-2"
                : "bg-primary-normal hover:border-[1px] active:scale-95 "
            } self-center flex justify-center  basis-1/2 border-black `}
            onClick={() => setActiveChatsDisplay(true)}
          >
            <img src={List} alt="" className="h-10" />
          </button>
          <button
            className={`${
              !activeChatsDisplay
                ? "bg-primary-strong border-2"
                : "bg-primary-normal hover:border-[1px] active:scale-95 "
            } flex justify-center basis-1/2  border-black`}
            onClick={() => setActiveChatsDisplay(false)}
          >
            <img src={ListCheck} alt="" className="h-10 " />
          </button>
        </div>
      </section>

      <SearchBar value={search} onChange={handleSearchChange} />
      <UsersToChat users={activeChatsDisplay ? activeChats : inactiveChats} />
    </div>
  );
}

export default ChatSideBar;
