import React from "react";
import ChatContainer from "../../components/chat/ChatContainer";
import ChatSideBar from "../../components/chat/ChatSideBar";
import InputMessage from "../../components/chat/InputMessage";
import ChatProvider from "../../context/ChatProvider";

// FIXME - Arreglar todos los errores de responsive
function Chat() {
  return (
    <ChatProvider>
      <div className="bg-[#f9f0f8] h-screen w-screen flex items-center justify-center">
        <main className="rounded-xl border-2 border-primary-normal w-[90%] md:w-[65%] h-[90%] overflow-hidden">
          <div className="flex overflow-hidden h-[calc(100%_-_80px)]">
            <ChatSideBar />
            <ChatContainer />
          </div>

          <InputMessage />
        </main>
      </div>
    </ChatProvider>
  );
}

export default Chat;
