import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/navigation/Footer";
import LandingHeader from "../components/navigation/LandingHeader";
import { useAuth } from "../hooks/useAuth";

function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
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

export default ProtectedLayout;
