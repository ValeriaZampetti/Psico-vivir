import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { updateChatByMessage } from "../firebase/api/chatService";
import {
  getClientsByChats,
  getDoctorsByChats,
} from "../firebase/api/UserService";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import { Chat } from "../interfaces/Chat";
import { Client, Doctor, UserType } from "../interfaces/Client";
import { MessageCreate } from "../interfaces/Message";
import { IChatProvider } from "../interfaces/providers/IChatProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ChatContext = createContext<IChatProvider>({
  sendMessage: (message: string) => {
    return new Promise((resolve, reject) => {});
  },
  usersActive: [],
  usersInactive: [],
  currentUserToChat: null,
  handleSelectUserToChat: (user: Doctor | Client) => {},
  currentChat: null,
});

function ChatProvider({ children }: IProps) {
  const [usersToChat, setUsersToChat] = useState<Client[] | Doctor[]>([]);
  const [usersActive, setUsersActive] = useState<Client[] | Doctor[]>([]);
  const [usersInactive, setUsersInactive] = useState<Client[] | Doctor[]>([]);

  const [currentUserToChat, setCurrentUserToChat] = useState<
    Client | Doctor | null
  >(null);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  const params = new URLSearchParams(window.location.search);
  const { user } = useAuth();

  useEffect(() => {
    initializeChats();
  }, [user]);

  useEffect(() => {
    if (chats.length > 0) {
      initializeClientsToChat(chats);
      const newcurrentChat: Chat | null =
        chats.find((chat) => chat.id === currentChat?.id) ?? null;

      setCurrentChat(newcurrentChat);
    }
  }, [chats]);

  async function initializeClientsToChat(chats: Chat[]) {
    switch (user?.type) {
      case UserType.DOCTOR:
        const { clients, clientsActive, clientsInactive } =
          await getClientsByChats(chats);

        setUsersToChat(clients);
        setUsersActive(clientsActive);
        setUsersInactive(clientsInactive);
        break;

      case UserType.CLIENT:
        const { doctors, doctorsActive, doctorsInactive } =
          await getDoctorsByChats(chats);

        setUsersToChat(doctors);
        setUsersActive(doctorsActive);
        setUsersInactive(doctorsInactive);
        break;
    }

    const chatId = params.get("chatId");
    if (chatId !== null) {
      const chat = chats.find((chat) => chat.id === chatId) ?? null;
      console.log(chatId);
      setCurrentChat(chat);
    }
  }

  async function initializeChats() {
    const collectionRef = collection(db, "chats");

    switch (user?.type) {
      case UserType.DOCTOR:
        const doctorQuery = query(
          collectionRef,
          where("doctorId", "==", user!.id),
          orderBy("updatedAt", "desc")
        );

        const doctorUnsub = onSnapshot(doctorQuery, (querySnapshot) => {
          setChats(
            querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Chat)
            )
          );
        });

        return () => doctorUnsub();

      case UserType.CLIENT:
        const clientQuery = query(
          collectionRef,
          where("clientId", "==", user!.id),
          orderBy("updatedAt", "desc")
        );

        const clientUnsub = onSnapshot(clientQuery, (querySnapshot) => {
          setChats(
            querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Chat)
            )
          );
        });

        return () => clientUnsub();
    }
  }

  function sendMessage(body: string): Promise<void> {
    if (!currentChat) {
      throw new Error("No hay chat seleccionado");
    }

    if (!user) {
      throw new Error("No hay usuario logueado");
    }

    const message: MessageCreate = {
      senderId: user!.id,
      body,
    };

    return updateChatByMessage(message, currentChat!, user.type);
  }

  function handleSelectUserToChat(userToChat: Doctor | Client) {
    setCurrentUserToChat(userToChat);

    let chat: Chat | null = null;
    switch (userToChat.type) {
      case UserType.CLIENT:
        chat = chats.find((chat) => chat.clientId === userToChat.id) ?? null;

        setCurrentChat(chat);

        break;

      case UserType.DOCTOR:
        chat = chats.find((chat) => chat.doctorId === userToChat.id) ?? null;
        setCurrentChat(chat);

        break;

      case UserType.ADMIN:
        chat =
          chats.find(
            (chat) =>
              chat.clientId === userToChat.id || chat.doctorId === userToChat.id
          ) ?? null;

        setCurrentChat(chat);

        break;
      default:
        break;
    }
  }

  const value: IChatProvider = {
    sendMessage,
    usersActive,
    usersInactive,
    currentUserToChat,
    currentChat,
    handleSelectUserToChat,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
