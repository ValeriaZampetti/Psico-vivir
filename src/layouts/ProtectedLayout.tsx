import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Footer } from "../components/navigation/Footer";
import ProtectedHeader from "../components/navigation/ProtectedHeader";
import AuthProvider from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    console.log("dame un momento para cargar");
    return (
      <>
        <div>
          <ProtectedHeader />
          <div className="bg-gray-400 mt-[4.5rem] relative h-48 w-full p-[15rem]">
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

  // // TODO - Crear componente para usuario no logueado
  if (!user) {
    setTimeout(() => {
      console.log(
        "No estas logueado mi loco, seras redirigido en 5 segundos al login"
      );
      navigate("/users/login");
    }, 3500);
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="mx-auto text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal text-center sm:max-w-md md:max-w-lg">
          No has iniciado sesion, seras redirigido en 3 segundos al login
        </h1>
      </div>




    );
  }

  return (
    <>
      <div>
        <ProtectedHeader />
        <div className="bg-white mt-[4.5rem]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProtectedLayout;
