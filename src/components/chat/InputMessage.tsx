import React from "react";
import Attach from "../../assets/icons/paperclip.svg";
import Image from "../../assets/icons/image.svg";

function InputMessage() {
  return (
    <div className="h-12 bg-white p-10 flex items-center justify-between">
      <input
        type="text"
        className="w-full border-none outline-none text-lg placeholder:text-gray-400"
        placeholder="Escribe un mensaje"
      />

      <section id="send" className="ml-2  flex items-center gap-2">
        <img src={Image} alt="sendImage" className="cursor-pointer h-6" />
        <input
          type="file"
          style={{ display: "none" }}
          className="w-full border-none outline-none text-lg placeholder:text-gray-400"
          id="file"
        />
        <label htmlFor="file" className="h-6 w-6 flex-shrink-0">
          <img src={Attach} className="cursor-pointer  h-6 w-6" alt="" />
        </label>

        <button className="bg-primary-strong text-white rounded-full p-3 hover:scale-95 active:scale-90">
          Enviar
        </button>
      </section>
    </div>
  );
}

export default InputMessage;
