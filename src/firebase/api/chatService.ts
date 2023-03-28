import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  startAfter,
  Timestamp,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";
import { Chat } from "../../interfaces/Chat";
import { UserType } from "../../interfaces/Client";
import { MessageCreate } from "../../interfaces/Message";
import { db } from "../config";

export async function getChatById(id: string): Promise<Chat | null> {
  const docRef = doc(db, "chats", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Chat;
  } else {
    return null;
  }
}

export async function getChatsByDoctorId(doctorId: string): Promise<Chat[]> {
  const collectionRef = collection(db, "chats");
  const q = query(
    collectionRef,
    where("doctorId", "==", doctorId),
    where("lastAppointmentActive", "==", true),
    orderBy("updatedAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const chats: Chat[] = [];

  querySnapshot.forEach((doc) => {
    chats.push({ id: doc.id, ...doc.data() } as Chat);
  });

  return chats;
}

export async function getChatsByClientId(id: string): Promise<Chat[]> {
  const collectionRef = collection(db, "chats");
  const q = query(
    collectionRef,
    where("clientId", "==", id),
    where("lastAppointmentActive", "==", true),
    orderBy("updatedAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const chats: Chat[] = [];

  querySnapshot.forEach((doc) => {
    chats.push({ id: doc.id, ...doc.data() } as Chat);
  });

  return chats;
}

export async function getChatsDoctorPaginated(
  id: string,
  docAppointmentToStart?: DocumentSnapshot<DocumentData> | null
): Promise<{
  snapShot: QuerySnapshot<DocumentData>;
  lastVisible: DocumentSnapshot<DocumentData> | null;
}> {
  const collectionRef = collection(db, "chats");

  const numerOfEntitiesByPage = 10;
  const q = docAppointmentToStart
    ? query(
        collectionRef,
        where("doctorId", "==", id),
        where("lastAppointmentActive", "==", true),
        orderBy("updatedAt", "desc"),
        startAfter(docAppointmentToStart),
        limit(numerOfEntitiesByPage)
      )
    : query(
        collectionRef,
        where("doctorId", "==", id),
        where("lastAppointmentActive", "==", true),
        orderBy("updatedAt", "desc"),
        limit(numerOfEntitiesByPage)
      );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { snapShot: querySnapshot, lastVisible };
}

export async function getChatsClientPaginated(
  id: string,
  docAppointmentToStart?: DocumentSnapshot<DocumentData> | null
): Promise<{
  snapShot: QuerySnapshot<DocumentData>;
  lastVisible: DocumentSnapshot<DocumentData> | null;
}> {
  const collectionRef = collection(db, "chats");

  const numerOfEntitiesByPage = 10;
  const q = docAppointmentToStart
    ? query(
        collectionRef,
        where("clientId", "==", id),
        where("lastAppointmentActive", "==", true),
        orderBy("updatedAt", "desc"),
        startAfter(docAppointmentToStart),
        limit(numerOfEntitiesByPage)
      )
    : query(
        collectionRef,
        where("doctorId", "==", id),
        where("lastAppointmentActive", "==", true),
        orderBy("updatedAt", "desc"),
        limit(numerOfEntitiesByPage)
      );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { snapShot: querySnapshot, lastVisible };
}

export async function updateChatByMessage(
  message: MessageCreate,
  currentChat: Chat,
  userType: UserType
): Promise<void> {
  try {
    const lastAppointment =
      currentChat.appointments[currentChat.appointments.length - 1];

    const docRef = doc(db, "chats", currentChat.id);
    const newMessage = {
      ...message,
      date: Timestamp.now(),
    };

    if (userType === UserType.DOCTOR) {
      lastAppointment.clientCanTalk = true;
    }

    lastAppointment.messages.push(newMessage);

    return updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      appointments: [
        ...currentChat.appointments.slice(0, -1),
        {
          ...lastAppointment,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function desactiveChat(chatId: string): Promise<void> {
  try {
    const docRef = doc(db, "chats", chatId);

    return updateDoc(docRef, {
      lastAppointmentActive: false,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
