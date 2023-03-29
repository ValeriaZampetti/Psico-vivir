import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import StarRating from "../components/forms/StarRating";
import { getUserById } from "../firebase/api/userService";
import { db, storage } from "../firebase/config";
import { useTimestampToString } from "../hooks/useTimestampToString";
import { Client, Doctor } from "../interfaces/Client";
import { Feedback } from "../interfaces/feedback";
import Profile from "../assets/mock/pic.jpg";

interface ReviewCardProps {
  doctor: Doctor;
  feedback: Feedback;
  userId: string;
}

function ReviewCard(props: ReviewCardProps) {
  const [ranking, setRanking] = React.useState<number>(props.doctor.ranking);

  const [user, setUser] = useState<Client>();

  const initializeClient = async () => {
    setUser(await getUserById(props.userId));
  };

  useEffect(() => {
    initializeClient();
  }, []);

  const dateString = useTimestampToString(props.feedback.timestamp.seconds);
  

  // // const [timestamp, setTimestamp] = useState("");
  // // const [message, setMessage] = useState("");

  // const getComments = async () => {
  //   const feedbackCollection = collection(db, "feedback");
  //   const feedbackSnapshot = await getDocs(feedbackCollection);
  //   const comments = feedbackSnapshot.docs.map((doc) => doc.data());

  //   if (feedbackSnapshot) {
  //     // console.log(comments[0]["rating"])
  //     for (let index = 0; index < comments.length; index++) { // aqui hay que usar la funcion map no un ciclo for
  //       const commentsDate = comments[index]["timestamp"]["seconds"];
  //       const commentsMessage = comments[index]["message"];
  //       // console.log(commentsDate)
  //       setTimestamp(commentsDate);
  //       setMessage(commentsMessage);
  //     }
  //   }
  // };

  // // useEffect(() => {
  // //   getComments();
  // // }, []);

  // const getTimeStamp = getComments().then((comments) => {
  //   console.log(comments[2]["timestamp"]["seconds"]);
  // const date = new Date(comments[2]["timestamp"]["seconds"] * 1000);
  // const test = comments[2]["timestamp"]["seconds"];
  // return test;
  // });

  // para las imagenes de cada usuario creo
  // const gsReference = ref(
  //   storage,
  //   "gs://psico-vivir.appspot.com/imagesUsers/aiudaporfavor.jpg"
  // );
  // const img = document.getElementById("profile-pic");
  // getDownloadURL(gsReference).then((url) => {
  //   const img = document.getElementById("profile-pic");
  //   img?.setAttribute("src", url);
  // });

  return (
    <main className="h-48 m-0 flex justify-around items-center max-[900px]:h-auto max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:p-8">
      <img
        // id="profile-pic"
        src={Profile}
        alt="client-profile-pic"
        className="h-32 aspect-square rounded-full border-primary-normal border-8 max-[900px]:h-52"
      />

      <header className="h-1/2 w-1/5 flex flex-col gap-1 bg-white max-[900px]:w-full">
        <h1 className="font-semibold text-3xl max-[1080px]:font-bold max-[1080px]:text-xl max-[900px]:flex max-[900px]:justify-center max-[900px]:text-4xl">
          {user?.name} {/* auto */}
        </h1>

        <div>
          <h2 className="text-lg max-[900px]:text-center max-[900px]:text-3xl">
            {dateString}{/* {useTimestampToString(parseInt(timestamp, 10))} */}
          </h2>
        </div>

        <div className="flex items-center">
          <StarRating
            svgClass="h-[2rem]"
            currentRating={ranking}
            handleCurrentRating={(rating: number) => {
              setRanking(rating);
            }}
            readonly={true}
          />
        </div>
      </header>

      <section className="h-2/3 w-2/6 flex flex-col justify-center text-gray-500 max-[900px]:w-full max-[900px]:pb-8">
        <h3 className="text-xl font-semibold max-[900px]:text-xl max-[900px]:flex max-[900px]:justify-center">
          Comentario:
        </h3>

        <h4 className="max-[900px]:text-sm max-[900px]:flex text-justify justify-center">
          {props.feedback.message}
        </h4>
      </section>
    </main>
  );
}

export default ReviewCard;
