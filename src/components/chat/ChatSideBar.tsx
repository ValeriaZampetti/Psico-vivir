import React, { useState } from "react";
import { Client } from "../../interfaces/Client";
import SearchBar from "../forms/SearchBar";
import ChatUsers from "./ChatUsers";

function ChatSideBar() {
  const [search, setSearch] = useState<string>("");
  const [clientsToChat, setClientsToChat] = useState<Client[]>([]);
  const [clientsToChatFiltered, setClientsToChatFiltered] = useState<Client[]>([]);


  function handleSearchChange(value: string) {
    setSearch(value);
  
    const filteredClients = clientsToChat.filter((client) => {
      return client.name.toLowerCase().includes(value.toLowerCase());
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
            className="h-20 aspect-square rounded-full self-center"
          />
          <h1
            className="text-black text-2xl font-semibold self-center 
            text-ellipsis overflow-hidden max-[900px]:hidden"
          >
            Sergio Suárez
            {/* Nombre del doctor */}
          </h1>
        </div>
      </section>

      <SearchBar value={search} onChange={handleSearchChange} />
      <ChatUsers users={clientsToChatFiltered}/>
    </div>
  );
}

export default ChatSideBar;
