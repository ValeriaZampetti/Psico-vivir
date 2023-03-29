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
  console.log({ user });
  if (!user) {
    setTimeout(() => {
      navigate("/users/login");
    }, 5000);
    return (
      <h1>No estas logueado, te redireccionaremos a la pagina de login en 5</h1>
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
