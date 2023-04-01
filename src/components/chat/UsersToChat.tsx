import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { Client } from "../../interfaces/Client";

interface IProps {
  users: Client[];
}
function UsersToChat(props: IProps) {
  const { handleSelectUserToChat, currentUserToChat } = useChat();

  // TODO - Si no hay usuarios, poner un mensaje de que no hay usuarios
  // TODO - Si es el mismo usuario que esta seleccionado, ponerle un borde, background o algo
  const usersTochat = props.users.map((user, index) => {
    return (
      <section
        key={user.id}
        onClick={() => handleSelectUserToChat(user)}
        className={`flex flex-col  gap-y-2 w-full px-4 py-2 border-2 
          ${
            user.id === (currentUserToChat?.id ?? "")
              ? "bg-quaternary-normal  border-primary-strong"
              : "border-gray-400  bg-secondary-normal"
          } 
          cursor-pointer hover:bg-quaternary-normal duration-100`}
      >
        <main className="flex flex-row items-center gap-x-10 justify-center sm:justify-start">
          <img
            className="rounded-full h-12 aspect-square object-cover hidden sm:block"
            src="../../src/assets/mock/pic.jpg"
          />

          <span className="font-semibold text-lg text-black text-ellipsis overflow-hidden">
            {user.name}
          </span>
        </main>
      </section>
    );
  });

  // TODO - Arreglar overflow y eso
  return (
    <div id="userChat" className="flex flex-col items-center text-white">
      {usersTochat}
    </div>
  );
}

export default UsersToChat;
