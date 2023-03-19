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
} from "firebase/firestore";
import { Appointment } from "../interfaces/Appointment";
import { Client, Doctor } from "../interfaces/Client";
import { Feedback } from "../interfaces/feedback";

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

export function getDoctorById(
  doctorId: string
): Promise<DocumentSnapshot<DocumentData>> {
  const collectionRef = collection(db, "users");

  return getDoc(doc(collectionRef, doctorId));
}

export async function getAppointmentsDoctor(
  id: string
): Promise<Appointment[]> {
  const collectionRef = collection(db, "appointments");
  const q = query(
    collectionRef,
    where("completed", "==", false),
    where("doctor", "==", id)
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
  const collectionRef = collection(db, "appointments");
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

export function addFeedback(
  clientId: string,
  doctorId: string,
  message: string
) {
  const collectionRef = collection(db, "feedback");
  const feedbackObj: Feedback = {
    clientId,
    doctorId,
    message,
  };
  return addDoc(collectionRef, feedbackObj);
}

export async function createUser(client: Client, password: string): Promise<UserCredential | null> {
  const collectionRef = collection(db, "users");
  console.log("Creating user", client.email);
  const userCredential = await createUserWithEmailAndPassword(auth, client.email, password)
  
  const user = userCredential.user;

  const clientRef = doc(collectionRef, user.uid);
  setDoc(clientRef, client);
  console.log("User created", user.uid);
  return userCredential
}

export async function signIn(email: string, password: string): Promise<UserCredential | null> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function signInWithGoogle(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: Client = {
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
  return client.type === 1 ? (client as Client) : (client as Doctor);
}

export async function signInWithGithub(): Promise<UserCredential | null> {
  try {
    const result = await signInWithPopup(auth, githubAuthProvider);
    const collectionRef = collection(db, "users");

    const document = await getDoc(doc(collectionRef, result.user?.uid));
    if (!document.exists()) {
      const client: Client = {
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
        type: 1
      }

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
