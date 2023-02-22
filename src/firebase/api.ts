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
} from "firebase/firestore";

import {db} from './config';

export function getDoctors(){
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("type", "==", 2));
  return getDocs(q);
}