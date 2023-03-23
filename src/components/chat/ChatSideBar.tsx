import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { Client, Doctor } from "../../interfaces/Client";
import SearchBar from "../forms/SearchBar";
import UsersToChat from "./UsersToChat";

function ChatSideBar() {
  const [search, setSearch] = useState<string>("");
  const [usersToChatFiltered, setClientsToChatFiltered] = useState<
    Client[] | Doctor[]
  >([]);

  const { usersToChat } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    setClientsToChatFiltered(usersToChat);
  }, [usersToChat]);

  function handleSearchChange(value: string) {
    setSearch(value);

    const filteredClients = usersToChat.filter((user) => {
      return user.name.toLowerCase().includes(value.toLowerCase());
    });
    setClientsToChatFiltered(filteredClients);
  }

  return (
    <div className="flex-1 border-r-2 border-secondary-normal bg-secondary-normal">
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

      <SearchBar value={search} onChange={handleSearchChange} />
      <UsersToChat users={usersToChatFiltered} />
    </div>
  );
}

export default ChatSideBar;
