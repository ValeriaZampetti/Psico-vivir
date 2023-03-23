import React, { useState } from "react";
import Attach from "../../assets/icons/paperclip.svg";
import Image from "../../assets/icons/image.svg";
import { useChat } from "../../hooks/useChat";

// TODO - Si el doctor no habla, el cliente no puede
function InputMessage() {
  const [message, setMessage] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const { currentUserToChat, sendMessage, currentChat } = useChat();

  // useEfect(() => {
  //   const messages = document.getElementById("messages");
  //   if (messages) {
  //     messages.scrollTop = messages.scrollHeight;
  //   }
  // }, [currentChat]);

  function handleSendMessage() {
    if (message) {
      sendMessage(message).then(() => {
        const messages = document.getElementById("messages");
        if (messages) {
          messages.scrollTop = messages.scrollHeight;
        }
      });
      setMessage("");

      // Make it to go down when send a message
    }
  }

  return (
    <div className="h-12 bg-white p-10 flex items-center justify-between">
      <input
        type="text"
        className="w-full border-none outline-none text-lg placeholder:text-gray-400 
        disabled:cursor-not-allowed disabled:bg-white"
        placeholder={
          currentUserToChat ? "Escribe un mensaje" : "Selecciona un usuario"
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        disabled={!currentUserToChat}
      />

      <section id="send" className="ml-2  flex items-center gap-2">
        {/* REVIEW - Considerar poner imagenes */}
        {/* <img src={Image} alt="sendImage" className="cursor-pointer h-6 " />
        <input
          type="file"
          style={{ display: "none" }}
          className="w-full border-none outline-none text-lg placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          id="file"
          disabled={!currentUserToChat}
          onChange={(e) => setImg(e.target.files![0])}
        />
        <label htmlFor="file" className="h-6 w-6 flex-shrink-0">
          <img src={Attach} className="cursor-pointer h-6 w-6 " alt="" />
        </label> */}

        <button
          className="bg-primary-strong text-white rounded-full p-3 hover:scale-95 active:scale-90 transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          disabled={!currentUserToChat}
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </section>
    </div>
  );
}

export default InputMessage;
function useEfect(arg0: () => void, arg1: string[]) {
  throw new Error("Function not implemented.");
}
