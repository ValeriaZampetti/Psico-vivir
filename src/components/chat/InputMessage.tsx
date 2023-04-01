import React, { useEffect, useState } from "react";
import Attach from "../../assets/icons/paperclip.svg";
import Image from "../../assets/icons/image.svg";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../hooks/useAuth";
import { UserType } from "../../interfaces/Client";

// TODO - Si el doctor no habla, el cliente no puede
function InputMessage() {
  const [message, setMessage] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [canTalk, setCanTalk] = useState<boolean>(true);
  const [placeholder, setPlaceholder] = useState<string>("Escribe un mensaje");

  const { sendMessage, currentChat } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    if (!currentChat) {
      setPlaceholder("Selecciona un usuario");
      setCanTalk(false);
      return;
    }

    const lastAppointment = currentChat?.appointments.at(-1)!;
    if (user?.type === 1 && !lastAppointment.clientCanTalk) {
      setPlaceholder("Necesita que el doctor le escriba primero");
      setCanTalk(false);
      return;
    }

    setPlaceholder("Escribe un mensaje");
    setCanTalk(true);
  }, [currentChat]);

  function handleSendMessage() {
    const lastAppointment = currentChat?.appointments.at(-1)!;
    if (user?.type === 1 && !lastAppointment.clientCanTalk) {
      return;
    }

    if (message) {
      sendMessage(message).then(() => {
        const messages = document.getElementById("messages");
        if (messages) {
          messages.scrollTop = messages.scrollHeight;
        }
      });
      setMessage("");
    }
  }

  return (
    <div className="h-12 bg-white p-10 flex items-center justify-between">
      <input
        type="text"
        className="w-full border-none outline-none text-lg placeholder:text-gray-400 
        disabled:cursor-not-allowed disabled:bg-white"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && canTalk) {
            handleSendMessage();
          }
        }}
        disabled={!canTalk || !currentChat?.lastAppointmentActive}
      />

      <section id="send" className="ml-2  flex items-center gap-2">
        <button
          className="bg-quaternary-normal text-black font-semibold rounded-full px-5 py-3 hover:scale-95 active:scale-90 transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={!canTalk || !currentChat?.lastAppointmentActive}
        >
          Enviar
        </button>
      </section>
    </div>
  );
}

export default InputMessage;
