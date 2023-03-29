import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { Client, Doctor } from "../../interfaces/Client";
import UsersToChat from "./UsersToChat";
import List from "../../assets/icons/list.svg";
import ListCheck from "../../assets/icons/list-check.svg";

function ChatSideBar() {
  const [search, setSearch] = useState<string>("");

  const [activeChatsDisplay, setActiveChatsDisplay] = useState<boolean>(true);

  const [activeChats, setActiveChats] = useState<Client[] | Doctor[]>([]);
  const [activeFilteredChats, setActiveFilteredChats] = useState<
    Client[] | Doctor[]
  >([]);

  const [inactiveChats, setInactiveChats] = useState<Client[] | Doctor[]>([]);
  const [inactiveFilteredChats, setInactiveFilteredChats] = useState<
    Client[] | Doctor[]
  >([]);

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

      <section id="searchBar" className="border-b-2 border-gray-400 flex justify-center relative ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        <input
          className="w-full p-4 pl-10  text-gray-900  rounded-lg bg-transparent
          placeholder:text-gray-500 outline-none focus:border-2 border-primary-strong"
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </section>



      {/* bg-transparent text-black  placeholder:text-gray-500 text-ellipsis
        border-none outline-none w-[70%]  md:w-[90%] self-center flex py-1 text-center */}
      <UsersToChat
        users={activeChatsDisplay ? activeFilteredChats : inactiveFilteredChats}
      />
    </div>
  );
}

export default ChatSideBar;
