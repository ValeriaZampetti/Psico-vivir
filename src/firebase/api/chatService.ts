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
import { MessageCreate } from "../../interfaces/Message";
import { db } from "../config";

export async function getChatsByDoctorIdNormal(id: string): Promise<Chat[]> {
  const collectionRef = collection(db, "chats");
  const q = query(
    collectionRef,
    where("doctorId", "==", id),
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

export async function getChatsByDoctorId(
  id: string,
  handleChats: (chats: Chat[]) => void
): Promise<Unsubscribe> {
  const collectionRef = collection(db, "chats");

  const q = query(
    collectionRef,
    where("doctorId", "==", id),
    where("lastAppointmentActive", "==", true),
    orderBy("updatedAt", "desc")
  );

  const chats: Chat[] = [];

  const unsub = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach(
      (change) => {
        if (change.type === "added") {
          chats.push(change.doc.data() as Chat);
        }
        if (change.type === "modified") {
          const index = chats.findIndex(
            (chat) => chat.id === change.doc.data().id
          );
          chats[index] = change.doc.data() as Chat;
        }
        if (change.type === "removed") {
          const index = chats.findIndex(
            (chat) => chat.id === change.doc.data().id
          );
          chats.splice(index, 1);
        }
        console.log("chats", chats);
        handleChats(chats);
      },
      (error: any) => {
        console.log(error);
        unsub();
      }
    );
  });

  return unsub;
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
  currentChat: Chat
): Promise<void> {
  try {
    const lastAppointment =
      currentChat.appointments[currentChat.appointments.length - 1];

    const docRef = doc(db, "chats", currentChat.id);
    const newMessage = {
      ...message,
      date: Timestamp.now(),
    };

    return updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      appointments: [
        ...currentChat.appointments.slice(0, -1),
        {
          ...lastAppointment,
          messages: [...lastAppointment.messages, newMessage],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}
