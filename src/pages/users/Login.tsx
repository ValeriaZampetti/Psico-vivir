import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/navigation/Footer";
import { NavLog } from "../../components/NavLog";
import psicoLogin from "../../assets/images/psicoLogin.png";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

//import { Context } from "../store/appContext";
//import Swal from "sweetalert2";\

export const LogIn = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, logInWithGithub, logInWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const userCredential = await logIn(email, password);
      console.log(userCredential);
      if (userCredential) {
        toast.success("Inicio exitoso!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          console.log("me voy");
          navigate("/psico");
        }, 2000);
      } else {
        toast.error("No se pudo iniciar sesión");
        console.log("no user");
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Email inválido");
          break;

        case "auth/user-disabled":
          toast.error("Usuario deshabilitado");
          break;

        case "auth/user-not-found":
          toast.error("Usuario no encontrado");
          break;

        case "auth/wrong-password":
          toast.error("Contraseña incorrecta");
          break;

        case "auth/too-many-requests":
          toast.error("Demasiados intentos fallidos, intente más tarde");
          break;

        case "auth/network-request-failed":
          toast.error("No hay conexión a internet");
          break;

        case "auth/operation-not-allowed":
          toast.error("Operación no permitida");
          break;
        default:
          toast.error("No se pudo iniciar sesión");
          break;
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await logInWithGoogle();
      navigate(`/users/completeRegister/${userCredential?.user?.uid}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const userCredential = await logInWithGithub();
      navigate(`/users/completeRegister/${userCredential?.user?.uid}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-gray-300/40 px-14 py-7">
        <div
          className="backdrop-blur-lg bg-white drop-shadow-lg
            flex flex-row p-6 rounded-2xl justify-center"
        >
          <div className="w-[50%] lg:flex hidden justify-center">
            <img src={psicoLogin} className="w-auto h-[37rem] rounded-2xl" />
          </div>

          <main className="flex flex-col  justify-center lg:w-[50%]">
            <p className="text-end mb-12  ">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/users/register"
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                Registrate
              </Link>
            </p>

            <h1 className="text-2xl font-bold text-center">Bienvenido!</h1>

            <h2 className="text-center text-xl font-medium">
              Preparado para el cambio?
            </h2>

            <form
              className="my-10 flex flex-col justify-center gap-5 self-center"
              // onSubmit={handleSubmit}
            >
              <input
                className="rounded-xl p-4 border-4 border-secondary-normal w-full
                outline-none focus:border-primary-normal 
                hover:ring-1 focus:ring-2 ring-secondary-normal ring-offset-2 ring-offset-gray-100"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="rounded-xl p-4 border-4 border-secondary-normal w-full
                outline-none focus:border-primary-normal
                hover:ring-1 focus:ring-2 ring-secondary-normal ring-offset-2 ring-offset-gray-100"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <p>Olvidaste tu contraseña?</p>

              <button
                // type="submit"
                onClick={handleSubmit}
                className="w-full py-3 text-primary-normal text-xl font-bold rounded-lg shadow-lg duration-300 
                  border-primary-light border-2
                  hover:bg-primary-normal hover:scale-95 hover:text-white active:scale-90
                  hover:ring-4 ring-primary-light ring-offset-2 ring-offset-gray-100"
              >
                Iniciar sesión
              </button>
            </form>

            <footer className="mb-5">
              <p className="text-center">O inicia sesión con</p>
              <div className="flex justify-center gap-5 mt-5">
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
                  onClick={handleGithubSignIn}
                >
                  <img src={facebookIcon} />
                </button>
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
                  onClick={handleGoogleSignIn}
                >
                  <img src={googleIcon} />
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default LogIn;
