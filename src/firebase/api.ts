import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
import { Client } from "../interfaces/Client";
import { Feedback } from "../interfaces/feedback";

import { auth, db } from "./config";

export function getDoctors(): Promise<QuerySnapshot<DocumentData>> {
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

  return getDocs(q);
}

export function getClients () {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("type", "==", 1));

  return getDocs(q);
}

export function getDoctorById(
  doctorId: string
): Promise<DocumentSnapshot<DocumentData>> {
  const collectionRef = collection(db, "users");

  return getDoc(doc(collectionRef, doctorId));
}

export function getAppointmentsDoctor(id: string) {
  const collectionRef = collection(db, "appointments");
  const q = query(
    collectionRef,
    where("completed", "==", false),
    where("doctor", "==", id)
  );

  return getDocs(q);
}

export function getAppointmentsClient(id: string) {
  const collectionRef = collection(db, "appointments");
  const q = query(
    collectionRef,
    where("completed", "==", false),
    where("client", "==", id)
  );

  return getDocs(q);
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

export function createUser(
  client: Client,
  password: string
) {
  const collectionRef = collection(db, "users");
  console.log("Creating user", client.email);
  createUserWithEmailAndPassword(auth, client.email, password).then(
    (userCredential) => {
      const user = userCredential.user;

      const clientRef = doc(collectionRef, user.uid);
      setDoc(clientRef, client);
      console.log("User created", user.uid);
    }
  );
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth,email, password);
}