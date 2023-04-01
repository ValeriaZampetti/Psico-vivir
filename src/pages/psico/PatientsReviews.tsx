import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { comment } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import StarRating from "../../components/forms/StarRating";
import ReviewCard from "../../components/ReviewCard";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { Doctor, UserType } from "../../interfaces/Client";
import { Feedback } from "../../interfaces/feedback";
import Error404 from "../Error404";

function PatientsReviews() {
  const { user } = useAuth();
  const [message, setMessage] = useState<Feedback[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const getComments = async () => {
    const feedbackCollection = collection(db, "feedback");
    const q = query(feedbackCollection, where("doctorId", "==", user?.id));
    const feedbackSnapshot = await getDocs(q);
    const comments = feedbackSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        chatId: data.chatId,
        appointmentIndex: data.appointmentIndex,
        rating: data.rating,
        message: data.message,
        timestamp: data.timestamp,
        userId: data.userId,
        doctorId: data.doctorId,
      } as Feedback;
    });

    setMessage(comments);

    // if(user?.id == data.doctorId){
    // }
  };

  useEffect(() => {
    if (!user) {
      setErrorMessage("No tiene sesión iniciada");
      return;
    }

    if (user?.type !== UserType.DOCTOR) {
      setErrorMessage("No tiene permisos para acceder a esta página");
      return;
    }

    getComments();
  }, [user]);

  if (!user || user.type === UserType.CLIENT)
    return <Error404 errorMessage={errorMessage} />;

  return (
    <div className="p-5 lg:p-10">
      <div className="relative flex items-center text-center text-3xl md:text-4xl lg:text-5xl font-bold border-solid drop-shadow-md mb-8 md:mb-10">
        Reviews de Pacientes
      </div>

      <div>
        {message.length === 0 && (
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              No ha recibido ningun review aún
            </h1>
            <h2 className="text-x font-mediuml">
              Empiece a chatear con clientes para poder visualizarlos
            </h2>
          </div>
        )}
        {message.map((comment) => (
          <div key={comment.id}>
            <ReviewCard
              doctor={doctor!}
              feedback={comment}
              userId={comment.userId}
            />
            {/* <p>{comment.rating}</p>
            <p>{comment.message}</p>
            <p>{comment.timestamp.toDate().toLocaleDateString()}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientsReviews;
