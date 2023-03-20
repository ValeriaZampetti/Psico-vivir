import { User, UserCredential } from "@firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
  DocumentData,
  where,
  query,
  DocumentSnapshot,
  setDoc,
  orderBy,
  Timestamp,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { Appointment } from "../interfaces/Appointment";
import {
  Client,
  ClientCreate,
  Doctor,
  DoctorCreate,
} from "../interfaces/Client";
import { Feedback, FeedbackCreate } from "../interfaces/Feedback";

import { auth, db, githubAuthProvider, googleAuthProvider } from "./config";

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

export function getClients() {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("type", "==", 1));

  return getDocs(q);
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

export async function getAppointmentsDoctorPaginated(
  id: string,
  docAppointmentToStart?: DocumentSnapshot<DocumentData> | null
): Promise<{
  snapShot: QuerySnapshot<DocumentData>;
  lastVisible: DocumentSnapshot<DocumentData> | null;
}> {
  const collectionRef = collection(db, "appointment");

  const numerOfEntitiesByPage = 10;
  const q = docAppointmentToStart
    ? query(
        collectionRef,
        where("completed", "==", false),
        where("doctorId", "==", id),
        orderBy("createdAt", "desc"),
        startAfter(docAppointmentToStart),
        limit(numerOfEntitiesByPage)
      )
    : query(
        collectionRef,
        where("completed", "==", false),
        where("doctorId", "==", id),
        orderBy("createdAt", "desc"),
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
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { snapShot: querySnapshot, lastVisible };
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

  // REVIEW - Para Sergio ver si lo hago en tiempo real
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //       cities.push(doc.data().name);f
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { snapShot: querySnapshot, lastVisible };
}

export async function getDoctorById(doctorId: string): Promise<Doctor> {
  const collectionRef = collection(db, "users");

  const documentSnapshot = await getDoc(doc(collectionRef, doctorId));
  return { id: documentSnapshot.id, ...documentSnapshot.data() } as Doctor;
}

export async function getAppointmentsDoctor(
  doctorId: string
): Promise<Appointment[]> {
  const collectionRef = collection(db, "appointment");
  const q = query(
    collectionRef,
    where("completed", "==", false),
    where("doctorId", "==", doctorId)
  );

  const querySnapshot = await getDocs(q);
  const appointments: Appointment[] = [];

  querySnapshot.forEach((doc) => {
    appointments.push({ id: doc.id, ...doc.data() } as Appointment);
  });
  return appointments;
}

export async function getAppointmentsClient(
  id: string
): Promise<Appointment[]> {
  const collectionRef = collection(db, "appointment");
  const q = query(
    collectionRef,
    where("completed", "==", false),
    where("client", "==", id)
  );

  const querySnapshot = await getDocs(q);
  const appointments: Appointment[] = [];

  querySnapshot.forEach((doc) => {
    appointments.push({ id: doc.id, ...doc.data() } as Appointment);
  });
  return appointments;
}

// FIXME - mejorar logica para addFeedback
export function addFeedback(
  chatId: string,
  appointmentId: string,
  message: string,
  rating: number
) {
  const feedbackCollectionRef = collection(db, "feedback");
  const feedbackObj: FeedbackCreate = {
    appointmentId,
    message,
    rating,
  };
  addDoc(feedbackCollectionRef, feedbackObj);

  const chatCollectionRef = collection(db, "chats");
  setDoc(doc(chatCollectionRef, chatId), {
    lastAppointmentActive: false,
  });
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

export async function signIn(
  email: string,
  password: string
): Promise<UserCredential | null> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function logOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.log("error", error);
  }
}

export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: ClientCreate = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
        type: 1,
      };

      const clientRef = doc(collectionRef, result.user?.uid);
      setDoc(clientRef, client);
    }

    await auth.updateCurrentUser(result.user);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function getUserById(userId: string): Promise<Client | Doctor> {
  const collectionRef = collection(db, "users");

  const document = await getDoc(doc(collectionRef, userId));
  const client = document.data()!;
  client.id = document.id;
  return client.type === 1 ? (client as Client) : (client as Doctor);
}

export async function createMocked10Doctors() {
  const collectionRef = collection(db, "users");
  for (let i = 0; i < 10; i++) {
    const doctor: DoctorCreate = {
      name: `Doctor ${i}`,
      email: `${i}@gmail.com`,
      type: 2,
      specialties: ["hola", "fafaf"],
      telephone: `${i}`,
      ranking: 3,
      biography: `biography ${i}`,
    };
    const docRef = await addDoc(collectionRef, {
      ...doctor,
      createdAt: serverTimestamp(),
      image: "https://picsum.photos/200",
    });
  }
}

export async function signInWithGithub(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, githubAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: ClientCreate = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
        type: 1,
      };

      const clientRef = doc(collectionRef, result.user?.uid);
      setDoc(clientRef, client);
    }

    auth.updateCurrentUser(result.user);
    return result;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
