import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  DocumentSnapshot,
  limit,
  orderBy,
  QuerySnapshot,
  startAfter,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  addDoc,
  updateDoc,
  WhereFilterOp,
  QueryFieldFilterConstraint,
  Timestamp,
} from "firebase/firestore";
import { Chat } from "../../interfaces/Chat";
import { Doctor, Client } from "../../interfaces/Client";
import { Specialty } from "../../interfaces/Specialty";
import { db } from "../config";

export async function getUserById(userId: string): Promise<Client | Doctor> {
  const collectionRef = collection(db, "users");

  const document = await getDoc(doc(collectionRef, userId));

  const client = document.data()!;
  client.id = document.id;
  return client.type === 1 ? (client as Client) : (client as Doctor);
}

export async function getDoctors(): Promise<Doctor[]> {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("type", "==", 2));

  const querySnapshot = await getDocs(q);
  const doctors: Doctor[] = [];

  querySnapshot.forEach((doc) => {
    doctors.push({ id: doc.id, ...doc.data() } as Doctor);
  });

  return doctors;
}

export async function getDoctorsPaginated(
  docDoctorToStart?: DocumentSnapshot<DocumentData> | null,
  optionalWheres?: QueryFieldFilterConstraint[]
): Promise<{
  snapShot: QuerySnapshot<DocumentData>;
  lastVisible: DocumentSnapshot<DocumentData> | null;
}> {
  const collectionRef = collection(db, "users");

  optionalWheres = optionalWheres || [];

  console.log(docDoctorToStart ? "si docDoctorToStart" : "no docDoctorToStart");
  const numerOfEntitiesByPage = 10;
  const q = docDoctorToStart
    ? query(
        collectionRef,
        where("type", "==", 2),
        ...optionalWheres,
        orderBy("ranking", "desc"),
        startAfter(docDoctorToStart),
        limit(numerOfEntitiesByPage)
      )
    : query(
        collectionRef,
        where("type", "==", 2),
        ...optionalWheres,
        orderBy("ranking", "desc"),
        limit(numerOfEntitiesByPage)
      );

  // REVIEW - Para Sergio ver si lo hago en tiempo real
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //       cities.push(doc.data().name);
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });

  const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { snapShot: querySnapshot, lastVisible };
}

export async function getDoctorById(doctorId: string): Promise<Doctor> {
  const collectionRef = collection(db, "users");

  const documentSnapshot = await getDoc(doc(collectionRef, doctorId));
  return { id: documentSnapshot.id, ...documentSnapshot.data() } as Doctor;
}

// REVIEW - Sera que me suscribo a esto?
export async function getClients(): Promise<Client[]> {
  try {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("type", "==", 1));

    const querySnapshot = await getDocs(q);
    const clients: Client[] = [];

    querySnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() } as Client);
    });

    return clients;
  } catch (error) {
    throw error;
  }
}

export async function getSpecialties(): Promise<Specialty[]> {
  const collectionRef = collection(db, "specialties");
  const snapShot = await getDocs(collectionRef);
  console.log({ snapShot });
  return snapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Specialty;
  });
}

export async function getClientById(clientId: string): Promise<Client | null> {
  const collectionRef = collection(db, "users");

  const documentSnapshot = await getDoc(doc(collectionRef, clientId));
  return { id: documentSnapshot.id, ...documentSnapshot.data() } as Client;
}

export async function getClientsByChats(chats: Chat[]): Promise<{
  clients: Client[];
  clientsActive: Client[];
  clientsInactive: Client[];
}> {
  const userCollectionRef = collection(db, "users");
  const clients: Client[] = [];
  const clientsActive: Client[] = [];
  const clientsInactive: Client[] = [];

  for (const chat of chats) {
    const clientRef = doc(userCollectionRef, chat.clientId);

    const docSnapshot = await getDoc(clientRef);
    const client = { id: docSnapshot.id, ...docSnapshot.data() } as Client;
    clients.push(client);
    chat.lastAppointmentActive
      ? clientsActive.push(client)
      : clientsInactive.push(client);
  }

  return { clients, clientsActive, clientsInactive };
}

export async function getDoctorsByChats(chats: Chat[]): Promise<{
  doctors: Doctor[];
  doctorsActive: Doctor[];
  doctorsInactive: Doctor[];
}> {
  const userCollectionRef = collection(db, "users");
  const doctors: Doctor[] = [];
  const doctorsActive: Doctor[] = [];
  const doctorsInactive: Doctor[] = [];

  for (const chat of chats) {
    const doctorRef = doc(userCollectionRef, chat.doctorId);

    const docSnapshot = await getDoc(doctorRef);
    const doctor = { id: docSnapshot.id, ...docSnapshot.data() } as Doctor;
    doctors.push(doctor);
    chat.lastAppointmentActive
      ? doctorsActive.push(doctor)
      : doctorsInactive.push(doctor);
  }
  return { doctors, doctorsActive, doctorsInactive };
}

export async function updateRankingDoctor(
  doctorId: string,
  rating: number
): Promise<void> {
  const collectionRef = collection(db, "users");
  const doctorRef = doc(collectionRef, doctorId);

  const doctor = await getDoc(doctorRef);
  const doctorData = doctor.data() as Doctor;

  if (!doctorData.numberOfReviews || doctorData.numberOfReviews === 0) {
    await updateDoc(doctorRef, {
      ranking: rating,
      numberOfReviews: 1,
    });
    return;
  }

  const newRanking =
    (doctorData.ranking * doctorData.numberOfReviews + rating) /
    (doctorData.numberOfReviews + 1);

  await updateDoc(doctorRef, {
    ranking: Math.round(newRanking * 100) / 100,
    numberOfReviews: doctorData.numberOfReviews + 1,
  });
}

