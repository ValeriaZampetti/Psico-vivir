import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../components/navigation/Footer";
import LandingHeader from "../components/navigation/LandingHeader";
import AuthProvider from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function ProtectedLayout() {
  const { user, loading } = useAuth();

  // TODO - Crear componente para cargar
  if (loading) {
    return (
      <>
        <AuthProvider>
          <h1>Loading</h1>
        </AuthProvider>
      </>
    );
  }

  if (!user) return <Navigate to="users/login" />;

  console.log(user);

  return (
    <>
      <AuthProvider>
        <div>
          <LandingHeader />
          <div className="bg-white min-[768px]:max-[868px]:mt-[6rem] mt-[4.5rem]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
}

export default ProtectedLayout;
