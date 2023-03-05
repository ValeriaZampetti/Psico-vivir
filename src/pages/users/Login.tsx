import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/navigation/Footer";
import { NavLog } from "../../components/NavLog";
import psicoLogin from "../../assets/images/psicoLogin.png";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
//import { Context } from "../store/appContext";
//import Swal from "sweetalert2";

export const LogIn = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { store, actions } = useContext<any>(Context);
  const navigate = useNavigate();
  const notUser = () => {
    //Swal.fire({
    //icon: "error",
    //title: "Ha ocurrido un error",
    //text: "El usuario no está registrado, por favor registrese antes de iniciar sesión",
    //});
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <div className="bg-gray-300/40 px-14 py-7">
        <div
          className="backdrop-blur-lg bg-white  drop-shadow-lg
            flex flex-row p-6 rounded-2xl justify-center"
        >
          <div className="w-[50%] lg:flex hidden justify-center">
            <img
              src={psicoLogin}
              className="w-auto h-[37rem] rounded-2xl bg-primary-normal"
            />
          </div>
          <main className="flex flex-col  justify-center lg:w-[50%]">
            <p className="text-end mb-12  ">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
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
              className="my-10 flex flex-col justify-center gap-5 w-64 self-center"
              onSubmit={handleSubmit}
            >
              <input
                className="rounded-lg p-4 focus:outline-pink-400"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="rounded-lg p-4 focus:outline-pink-400"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <p>Olvidaste tu contraseña?</p>

              {/* TODO - Cambiar bg-green */}
              <input
                type="submit"
                value="Iniciar Sesión"
                className="w-full py-3 text-black font-bold uppercase rounded  transition-colors mb-5 
                  bg-primary-light hover:bg-primary-normal active:ring-1 ring-black shadow-lg cursor-pointer"
              />
            </form>

            <footer className="mb-5">
              <p className="text-center">O inicia sesión con</p>
              <div className="flex justify-center gap-5 mt-5">
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
                >
                  <img src={facebookIcon} />
                </button>
                <button
                  className="bg-white hover:bg-gray-100 active:ring-1 ring-black font-bold py-2 px-4 rounded-full 
                drop-shadow-md hover:drop-shadow-lg"
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
