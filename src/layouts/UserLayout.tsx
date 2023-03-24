import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { Footer } from "../components/navigation/Footer";
import LandingHeader from "../components/navigation/LandingHeader";
import AuthProvider from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function UserLayout() {
  const { loading } = useAuth();

  if (loading) {
    console.log("dame un momento para cargar");
    return (
      <>
        <div>
          <LandingHeader />
          <div className="bg-gray-400  min-[768px]:max-[868px]:mt-[6rem] mt-[4.5rem] relative h-48 w-full p-[15rem]">
            <Loading
              svgClass="h-[20rem] w-[20rem]"
              statusClass="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
            />
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <LandingHeader />
        <div className="bg-white min-[768px]:max-[868px]:mt-[6rem] mt-[4.5rem]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default UserLayout;
