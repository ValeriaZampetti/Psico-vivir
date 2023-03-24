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
  const [usersToChatFiltered, setClientsToChatFiltered] = useState<
    Client[] | Doctor[]
  >([]);

  const [activeChatsDisplay, setActiveChatsDisplay] = useState<boolean>(true);
  const [activeChats, setActiveChats] = useState<Client[] | Doctor[]>([]);
  const [inactiveChats, setInactiveChats] = useState<Client[] | Doctor[]>([]);

  const { usersToChat } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    setClientsToChatFiltered(usersToChat);
    // Populate activeChats and inactiveChats by filtering usersToChat
  }, [usersToChat]);

  useEffect(() => {}, [activeChatsDisplay]);

  function handleSearchChange(value: string) {
    setSearch(value);
    if (activeChatsDisplay) {
      const filteredClients = activeChats.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setClientsToChatFiltered(filteredClients);
    } else {
      const filteredClients = inactiveChats.filter((user) => {
        return user.name.toLowerCase().includes(value.toLowerCase());
      });
      setClientsToChatFiltered(filteredClients);
    }
  }

  return (
    <div className="flex-1 border-secondary-normal bg-secondary-normal">
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
              activeChatsDisplay ? "bg-primary-strong border-2" : "bg-primary-normal"
            } self-center flex justify-center h-12  basis-1/2`}
            onClick={() => setActiveChatsDisplay(true)}
          >
            <img src={List} alt="" className="h-10" />
          </button>
          <button
            className={`${
              !activeChatsDisplay ? "bg-primary-strong border-2" : "bg-primary-normal"
            } flex justify-center  basis-1/2`}
            onClick={() => setActiveChatsDisplay(false)}
          >
            <img src={ListCheck} alt="" className="h-10 " />
          </button>
        </div>
      </section>

      <SearchBar value={search} onChange={handleSearchChange} />
      <UsersToChat users={usersToChatFiltered} />
    </div>
  );
}

export default ChatSideBar;
