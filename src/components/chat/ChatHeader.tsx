import { Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { UserType } from "../../interfaces/Client";

function ChatHeader() {
  const [canCancelChat, setCanCancelChat] = useState(false);

  const { currentUserToChat, currentChat, endChat } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    if (!currentChat?.lastAppointmentActive) {
      setCanCancelChat(false);
      return;
    }

    const SECONDS_IN_A_MINUTE = 60;

    const lastAppointment = currentChat?.appointments.at(-1)!;

    const endAppointmentSeconds =
      lastAppointment.date.seconds +
      lastAppointment.duration * SECONDS_IN_A_MINUTE;

    const nowSeconds = new Timestamp(Date.now() / 1000, 0).seconds;

    setCanCancelChat(endAppointmentSeconds <= nowSeconds);

    if (!canCancelChat) {
      const timer = setInterval(() => {
        const actualSeconds = new Timestamp(Date.now() / 1000, 0).seconds;

        setCanCancelChat(endAppointmentSeconds <= actualSeconds);
      }, 1000 * SECONDS_IN_A_MINUTE);

      return () => clearInterval(timer);
    }
  }, [currentChat]);

  function cancelChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!canCancelChat) return;

    try {
      endChat(currentChat!.id);
      
      toast.success("Chat cancelado");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const cancelChatButton = (
    <button
      className="flex flex-row items-center justify-center gap-x-2 bg-[#ed4747] px-4 py-2 rounded-md
      drop-shadow-md text-white border-2 border-primary-light
      text-center duration-300  font-semibold ring-[#ed4747] text-lg
      outline-none ring-offset-1 enabled:hover:ring-2 focus:ring-2 
      enabled:hover:scale-95 enabled:active:bg-white enabled:active:text-[#ed4747] enabled:active:scale-90 
      disabled:opacity-50 disabled:cursor-not-allowed "
      onClick={cancelChat}
      disabled={!canCancelChat}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="max-[1000px]:hidden">Cancelar chat</span>
    </button>
  );

  return (
    <div className="h-16 px-4 py-2 bg-tertiary-normal flex flex-row justify-between">
      <div className="flex flex-row items-center gap-x-4">
        <img
          className="rounded-full h-12 aspect-square object-cover"
          src="../../src/assets/mock/pic.jpg"
        />
        <span className="font-semibold text-lg text-black text-ellipsis overflow-hidden">
          {currentUserToChat?.name ?? ""}
        </span>
      </div>
      {user!.type === UserType.DOCTOR && cancelChatButton}
    </div>
  );
}

export default ChatHeader;
