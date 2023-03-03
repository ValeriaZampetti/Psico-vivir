import React from "react"

export const ReservationCard = () => {
    return (
        <div className="h-48 m-0 flex justify-around items-center smax2:h-auto smax2:flex-col smax2:gap-4 smax2:p-8">
            <img src="../../src/assets/mock/pic.jpg" alt="profile-pic" className="h-32 aspect-square rounded-full border-rose-400 border-8 smax2:h-52"/>
            <div className="h-1/2 w-1/5 flex flex-col gap-1 bg-white smax2:w-full">
                <div className="font-semibold text-3xl relative smax1:font-bold smax1:text-xl smax2:flex smax2:justify-center smax2:text-5xl">Andres Ramirez</div>
                <div className="relative left-5 text-lg smax2:inset-x-0 smax2:flex smax2:justify-center smax2:text-3xl">20 de enero de 2023</div>
            </div>
            <div className="h-2/3 w-2/6 flex flex-col justify-center text-gray-500 smax2:w-full smax2:pb-8">
                <div className="text-xl font-semibold smax2:text-xl smax2:flex smax2:justify-center">Breve descripción:</div>
                <div className="smax2:text-sm smax2:flex smax2:text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </div>
            </div>
            <div className="w-1/5 h-1/3 flex justify-center items-center gap-8 smax2:w-48 smax2:h-16">
                <div className="h-full aspect-square rounded-2xl  border-rose-400 border-4 flex items-center justify-center hover:scale-110">
                    <img src="../../src/assets/icons/chat.svg" alt="check-icon" className="h-8"/>
                </div>
                <div className="h-full aspect-square rounded-2xl  border-rose-400 border-4 flex items-center justify-center hover:scale-110">
                    <img src="../../src/assets/icons/check.svg" alt="check-icon" className="h-12"/>
                </div>
            </div>
        </div>
    );
};

export default ReservationCard;