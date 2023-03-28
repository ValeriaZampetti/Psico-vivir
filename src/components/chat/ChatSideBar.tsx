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
  const [activeFilteredChats, setActiveFilteredChats] = useState<Client[] | Doctor[]>([]);

  const [inactiveChats, setInactiveChats] = useState<Client[] | Doctor[]>([]);
  const [inactiveFilteredChats, setInactiveFilteredChats] = useState<Client[] | Doctor[]>([]);

  const { usersActive, usersInactive } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    setActiveChats(usersActive);
    setActiveFilteredChats(usersActive);

    setInactiveChats(usersInactive);
    setInactiveFilteredChats(usersInactive);
  }, [usersActive, usersInactive]);

  useEffect(() => {}, [activeChatsDisplay]);

  // FIXME - Si no hay usuarios, que no se borer la lista
  function handleSearchChange(value: string) {
    setSearch(value);
    if (activeChatsDisplay) {
      const filteredClients = activeChats.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setActiveFilteredChats(filteredClients);
    } else {
      const filteredClients = inactiveChats.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setInactiveFilteredChats(filteredClients);
    }
  }

  return (
    <div className="flex-1 border-gray-400 border-r-2 bg-tertiary-normal">
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
                ? "bg-primary-normal border-[3px]"
                : "bg-secondary-normal hover:border-[1px] active:scale-95 "
            } self-center flex justify-center  basis-1/2 border-primary-strong `}
            onClick={() => setActiveChatsDisplay(true)}
          >
            <img src={List} alt="" className="h-10" />
          </button>
          <button
            className={`${
              !activeChatsDisplay
              ? "bg-primary-normal border-[3px]"
              : "bg-secondary-normal hover:border-[1px] active:scale-95 "
          } self-center flex justify-center  basis-1/2 border-primary-strong `}
            onClick={() => setActiveChatsDisplay(false)}
          >
            <img src={ListCheck} alt="" className="h-10 " />
          </button>
        </div>
      </section>

      <SearchBar value={search} onChange={handleSearchChange} />
      <UsersToChat users={activeChatsDisplay ? activeFilteredChats : inactiveFilteredChats} />
    </div>
  );
}

export default ChatSideBar;
