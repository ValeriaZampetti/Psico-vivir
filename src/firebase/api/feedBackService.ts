import { collection } from "@firebase/firestore";
import {
  addDoc,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Chat } from "../../interfaces/Chat";
import { Feedback, FeedbackCreate } from "../../interfaces/feedback";
import { db } from "../config";
import { updateRankingDoctor } from "./userService";

export async function createFeedback(
  feedback: FeedbackCreate,
  doctorId: string
): Promise<DocumentReference<DocumentData>> {
  try {
    const collectionRef = collection(db, "feedback");
    const q = query(
      collectionRef,
      where("chatId", "==", feedback.chatId),
      where("appointmentIndex", "==", feedback.appointmentIndex)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      throw new Error("Ya envió su opinión sobre esta cita");
    }

    const DocumentReference = await addDoc(collectionRef, feedback);
    updateRankingDoctor(doctorId, feedback.rating);
    return DocumentReference;
  } catch (error) {
    throw error;
  }
}
