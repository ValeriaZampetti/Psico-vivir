import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
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
} from "firebase/firestore";
import { Chat } from "../../interfaces/Chat";
import {
  Doctor,
  Client,
  ClientCreate,
  DoctorCreate,
} from "../../interfaces/Client";
import { auth, db } from "../config";

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

  // REVIEW - Para Sergio ver si lo hago en tiempo real
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //       cities.push(doc.data().name);
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });

  const querySnapshot = await getDocs(q);
  const doctors: Doctor[] = [];

  querySnapshot.forEach((doc) => {
    doctors.push({ id: doc.id, ...doc.data() } as Doctor);
  });

  return doctors;
}

export async function getDoctorsPaginated(
  docDoctorToStart?: DocumentSnapshot<DocumentData> | null
): Promise<{
  snapShot: QuerySnapshot<DocumentData>;
  lastVisible: DocumentSnapshot<DocumentData> | null;
}> {
  const collectionRef = collection(db, "users");

  const numerOfEntitiesByPage = 10;
  const q = docDoctorToStart
    ? query(
        collectionRef,
        where("type", "==", 2),
        orderBy("ranking", "desc"),
        startAfter(docDoctorToStart),
        limit(numerOfEntitiesByPage)
      )
    : query(
        collectionRef,
        where("type", "==", 2),
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
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("type", "==", 1));

  const querySnapshot = await getDocs(q);
  const clients: Client[] = [];

  querySnapshot.forEach((doc) => {
    clients.push({ id: doc.id, ...doc.data() } as Client);
  });

  return clients;
}

export function createUser(
  client: ClientCreate,
  password: string
): Promise<UserCredential | null> {
  const collectionRef = collection(db, "users");
  console.log("Creating user", client.email);
  return createUserWithEmailAndPassword(auth, client.email, password).then(
    (userCredential) => {
      const user = userCredential.user;

      const clientRef = doc(collectionRef, user.uid);

      setDoc(clientRef, {
        ...client,
        createdAt: serverTimestamp(),
      });
      console.log("User created", user.uid);
      return userCredential;
    }
  );
}

export async function getClientsByChats(chats: Chat[]): Promise<Client[]> {
  const userCollectionRef = collection(db, "users");
  const clients: Client[] = [];

  for (const chat of chats) {
    const clientRef = doc(userCollectionRef, chat.clientId);

    const docSnapshot = await getDoc(clientRef);
    clients.push({ id: docSnapshot.id, ...docSnapshot.data() } as Client);
  }

  return clients;
}

export async function getDoctorsByChats(chats: Chat[]): Promise<Doctor[]> {
  const userCollectionRef = collection(db, "users");
  const doctors: Doctor[] = [];

  console.log(chats)
  for (const chat of chats) {
    const doctorRef = doc(userCollectionRef, chat.doctorId);

    const docSnapshot = await getDoc(doctorRef);
    doctors.push({ id: docSnapshot.id, ...docSnapshot.data() } as Doctor);
  }
  return doctors;
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
    ranking: newRanking,
    numberOfReviews: doctorData.numberOfReviews + 1,
  });
}