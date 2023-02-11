import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import LandingHeader from "../components/LandingHeader";

function LandingLayout() {
  return (
    <>
      <div>
        <LandingHeader />
        <div className="mt-[4.5rem]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LandingLayout;
