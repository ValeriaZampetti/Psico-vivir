import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { comment } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import StarRating from "../../components/forms/StarRating";
import ReviewCard from "../../components/ReviewCard";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { Doctor } from "../../interfaces/Client";
import { Feedback } from "../../interfaces/feedback";

function PatientsReviews() {
  const { user } = useAuth();
  const [message, setMessage] = useState<Feedback[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  // const [feedback, setFeedback] = useState<Feedback | null>(null);

  // const [timestamp, setTimestamp] = useState("");

  // const getComments = async () => {
  //   const feedbackCollection = collection(db, "feedback");
  //   const feedbackSnapshot = await getDocs(feedbackCollection);
  //   const comments = feedbackSnapshot.docs.map((doc) => doc.data());

    // console.log(comments);

  //   setMessage(comments);

  //   //   if (feedbackSnapshot) {
  //   //     console.log(comments[0]["rating"])
  //   //     for (let index = 0; index < comments.length; index++) { // aqui hay que usar la funcion map no un ciclo for
  //   //       const commentsDate = comments[index]["timestamp"]["seconds"];
  //   //       const commentsMessage = comments[index]["message"];
  //   //       console.log(commentsDate)
  //   //       setTimestamp(commentsDate);
  //   //       setMessage(commentsMessage);
  //   //     }
  //   //   }
  // };

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
    getComments();
  }, []);



  return (
    <div className="p-5 lg:p-10">
      <div className="relative flex items-center text-center text-3xl md:text-4xl lg:text-5xl font-bold border-solid drop-shadow-md mb-8 md:mb-10">
        Reviews de Pacientes
      </div>

      <div>
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
