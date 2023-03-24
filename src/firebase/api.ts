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
