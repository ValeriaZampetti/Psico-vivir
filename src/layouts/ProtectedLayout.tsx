import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../components/navigation/Footer";
import LandingHeader from "../components/navigation/LandingHeader";
import AuthProvider from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // TODO - Crear componente para cargar
  if (loading) {
    console.log("dame un momento para cargar");
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  // TODO - Crear componente para usuario no logueado
  if (!user) {
    setTimeout(() => {
      console.log(
        "No estas logueado mi loco, seras redirigido en 5 segundos al login"
      );
      navigate("/users/login");
    }, 5000);
    return (
      <h1>
        No estas logueado mi loco, seras redirigido en 5 segundos al login
      </h1>
    );
  }

  console.log(user);

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
