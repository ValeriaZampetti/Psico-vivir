import React, { useEffect, useRef, useState } from "react";
import StarRating from "../components/forms/StarRating";
import { Doctor } from "../interfaces/Client";

interface DoctorCardProps {
  doctor: Doctor;
}

function ReviewCard() {
  const [ranking, setRanking] = useState(4);

  return (
    <main className="h-48 m-0 flex justify-around items-center max-[900px]:h-auto max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:p-8">
      <img
        id="profile-pic"
        src="../../src/assets/mock/pic.jpg"
        alt="user-profile-pic"
        className="h-32 aspect-square rounded-full border-rose-300 border-8 max-[900px]:h-52"
      />

      <header className="h-1/2 w-1/5 flex flex-col gap-1 bg-white max-[900px]:w-full">
        <h1 className="font-semibold text-3xl max-[1080px]:font-bold max-[1080px]:text-xl max-[900px]:flex max-[900px]:justify-center max-[900px]:text-4xl">
          Valeria Zampetti
        </h1>

        <h2 className="text-lg max-[900px]:text-center max-[900px]:text-3xl">
          20 de enero 2023
        </h2>

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere autem
          aspernatur asperiores et eum aperiam at voluptatum placeat itaque
          aliquam! Dignissimos nam ratione obcaecati libero eos eaque odit
          fugiat, deleniti voluptatum placeat consectetur perspiciatis animi
          atque dolorum voluptates reiciendis molestiae.
        </h4>
      </section>
    </main>
  );
}

export default ReviewCard;
