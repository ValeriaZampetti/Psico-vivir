import React, { useEffect, useRef, useState } from "react";
import StarRating from "../../components/forms/StarRating";
import Profile from "../../assets/mock/pic.jpg";
import { Client, Doctor } from "../../interfaces/Client"; // Pasarle el nombre del doc auto
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";
import {
  getChatsByClientId,
  getChatsByDoctorId,
  getChatById,
} from "../../firebase/api/chatService";
import {
  getClientById,
  getDoctorById,
  updateRankingDoctor,
} from "../../firebase/api/UserService";
import { Chat } from "../../interfaces/Chat";
import Loading from "../../components/Loading";
import Error404 from "../Error404";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FeedbackCreate } from "../../interfaces/feedback";
import { createFeedback } from "../../firebase/api/feedBackService";

function WriteReview() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loadingChat, setLoadingChat] = useState(true);
  const [chat, setChat] = useState<Chat | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [sendingFeedback, setSendingFeedback] = useState(false);

  const { chatId, index } = useParams<{ chatId: string; index: string }>();
  const { user } = useAuth();

  async function intializeChat() {
    setLoadingChat(true);

    if (isNaN(parseInt(index ?? ""))) {
      setErrorMessage("Ingrese un índice válido");
      console.log("No se encontró el chat");
      setLoadingChat(false);
      return;
    }

    if (chatId) {
      const chatInfo = await getChatById(chatId);
      setChat(chatInfo);

      setLoadingChat(false);
      if (!chatInfo) {
        setErrorMessage("No se encontró el chat");
        return;
      }

      initializeClient(chatInfo);
    }
  }

  async function initializeClient(chatInfo: Chat) {
    const clientInfo = await getClientById(chatInfo!.clientId);
    setClient(clientInfo);

    if (!clientInfo) {
      setErrorMessage("No se encontró el cliente");
      return;
    }

    if (clientInfo.id !== user!.id) {
      setErrorMessage("No tienes permisos para acceder a este chat");
      return;
    }

    initializeDoctor(chatInfo);
  }

  async function initializeDoctor(chatInfo: Chat) {
    const doctorInfo = await getDoctorById(chatInfo.doctorId);
    setDoctor(doctorInfo);
  }

  useEffect(() => {
    intializeChat();
  }, [chatId, index]);

  const sendFeedback = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setSendingFeedback(true);
      if (comment == "") {
        toast.error("Debes escribir un comentario");
        setSendingFeedback(false);
        return;
      }

      const feedback: FeedbackCreate = {
        chatId: chatId!,
        appointmentIndex: parseInt(index!, 10),
        rating: rating,
        message: comment,
        userId: user!.id,
        timestamp: Timestamp.now(),
      };

      const documentReference = await createFeedback(feedback, doctor!.id);

      toast.success("Comentario enviado exitosamente", {
        autoClose: 3000,
      });

      setTimeout(() => {
        setComment("");
        setSendingFeedback(false);
        setRating(0);
      }, 3000);
    } catch (error: any) {
      setSendingFeedback(false);
      console.log(error);
      toast.error(error.message, {
        autoClose: 3000,
      });
    }

    setTimeout(() => {
      setComment("");
    }, 2000);
  };

  const whileLoading = (
    <div className="bg-gray-400 relative h-48 w-full p-[15rem]">
      <Loading
        svgClass="h-[20rem] w-[20rem]"
        statusClass="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      />
    </div>
  );

  if (loadingChat) {
    return whileLoading;
  }

  if (errorMessage) {
    return <Error404 errorMessage={errorMessage} />;
  }

  return (
    <div className="p-5 lg:p-10">
      <div className="flex flex-col gap-4 items-center justify-center mb-10">
        <img
          src={Profile}
          alt="doctor-profile-pic"
          className="h-40 md:h-48 lg:h-64 rounded-full border-primary-normal border-8 mb-4 md:mb-6"
        />

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center border-solid drop-shadow-md">
          Dr. {doctor?.name}
        </h2>

        <StarRating
          currentRating={rating}
          handleCurrentRating={(newRating: number) => setRating(newRating)}
          svgClass="h-7 md:h-9 w-10 md:w-12"
        />

        <section className="w-full md:w-2/3 h-full self-center">
          <h3 className="text-xl text-center md:text-2xl font-bold mt-6 border-solid drop-shadow-md">
            Comentarios
          </h3>
          <textarea
            placeholder="Escribe tu comentario aqui..."
            className="rounded-lg px-4 resize-none h-24 md:h-32 w-full border-2 border-primary-normal outline-none mt-4 md:mt-6"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required={true}
          />
        </section>

        <button
          type="button"
          className="bg-primary-strong text-white font-bold w-auto rounded-lg px-4 py-2 text-xl md:text-2xl 
            hover:scale-95 active:scale-90 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          disabled={sendingFeedback}
          onClick={sendFeedback}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default WriteReview;
