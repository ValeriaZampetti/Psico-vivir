import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import {
  getChatsByDoctorId,
  getChatsByDoctorIdNormal,
  updateChatByMessage,
} from "../firebase/api/chatService";
import {
  getClientsByChats,
  getDoctorsByChats,
} from "../firebase/api/UserService";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import { Chat } from "../interfaces/Chat";
import { Client, Doctor } from "../interfaces/Client";
import { MessageCreate } from "../interfaces/Message";
import { IChatProvider } from "../interfaces/providers/IChatProvider";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ChatContext = createContext<IChatProvider>({
  sendMessage: (message: string) => {
    return new Promise((resolve, reject) => {});
  },
  usersToChat: [],
  currentUserToChat: null,
  handleSelectUserToChat: (user: Doctor | Client) => {},
  currentChat: null,
});

enum TypeUserChatting {
  CLIENT = "CLIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

// FIXME - Agarrar doctor si es paciente y viceversa\
function ChatProvider({ children }: IProps) {
  const [usersToChat, setUsersToChat] = useState<Client[] | Doctor[]>([]);
  const [usersActive, setUsersActive] = useState<Client[] | Doctor[]>([]);
  const [usersInactive, setUsersInactive] = useState<Client[] | Doctor[]>([]);

  const [currentUserToChat, setCurrentUserToChat] = useState<
    Client | Doctor | null
  >(null);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [typeUserChatting, setTypeUserChatting] = useState<TypeUserChatting>(
    TypeUserChatting.CLIENT
  );
  const { user } = useAuth();

  useEffect(() => {
    setTypeUserChatting(
      user?.type === 1 ? TypeUserChatting.CLIENT : TypeUserChatting.DOCTOR
    );
    initializeChats();
  }, [user?.id]);

  useEffect(() => {
    if (chats.length > 0) {
      initializeClientsToChat(chats);
      const newcurrentChat: Chat | null =
        chats.find((chat) => chat.id === currentChat?.id) ?? null;
      setCurrentChat(newcurrentChat);
    }
  }, [chats]);

  // FIXME - Agarrar solo los clientes que tienen chat
  async function initializeClientsToChat(chats: Chat[]) {
    let clients: Client[] = [];
    switch (typeUserChatting) {
      case TypeUserChatting.DOCTOR:
        clients = await getClientsByChats(chats);
        setUsersToChat(clients);
        break;

      case TypeUserChatting.CLIENT:
        clients = await getDoctorsByChats(chats);
        setUsersToChat(clients);
        break;
    }
  }

  async function initializeChats() {
    const collectionRef = collection(db, "chats");

    const q = query(
      collectionRef,
      where("doctorId", "==", user!.id),
      where("lastAppointmentActive", "==", true),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      setChats(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Chat))
      );
    });

    return () => unsub();
  }

  function sendMessage(body: string): Promise<void> {
    const message: MessageCreate = {
      senderId: user!.id,
      body,
    };
    return updateChatByMessage(message, currentChat!);
  }

  function handleSelectUserToChat(user: Doctor | Client) {
    setCurrentUserToChat(user);

    let chat: Chat | null = null;
    switch (typeUserChatting) {
      case TypeUserChatting.CLIENT:
        chat = chats.find((chat) => chat.doctorId === user.id) ?? null;

        setCurrentChat(chat);

        break;

      case TypeUserChatting.DOCTOR:
        chat = chats.find((chat) => chat.clientId === user.id) ?? null;
        setCurrentChat(chat);

        break;

      case TypeUserChatting.ADMIN:
        chat =
          chats.find(
            (chat) => chat.clientId === user.id || chat.doctorId === user.id
          ) ?? null;

        setCurrentChat(chat);

        break;
      default:
        break;
    }
  }

  const value: IChatProvider = {
    sendMessage,
    usersToChat,
    currentUserToChat,
    currentChat,
    handleSelectUserToChat,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
