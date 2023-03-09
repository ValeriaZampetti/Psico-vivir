import React, { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/navigation/Footer";
import { NavLog } from "../../components/NavLog";
import psicoLogin from "../../assets/images/psicoLogin.png";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { useAuth } from "../../hooks/useAuth";
//import { Context } from "../store/appContext";
//import Swal from "sweetalert2";\

export const LogIn = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const notUser = () => {
        //Swal.fire({
        //icon: "error",
        //title: "Ha ocurrido un error",
        //text: "El usuario no está registrado, por favor registrese antes de iniciar sesión",
        //});
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const userCredential = await login(email, password);

            if (userCredential) {
                setTimeout(() => {
                    // TODO - Avisar que sera redirigido
                    console.log("me voy");
                    navigate("/psico");
                }, 2000);
            } else {
                console.log("no user");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="bg-gray-300/40 px-14 py-7">
                <div
                    className="backdrop-blur-lg bg-white drop-shadow-lg
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
                                to="/users/register"
                                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            >
                                Registrate
                            </Link>
                        </p>
                        <h1 className="text-2xl font-bold text-center">
                            Bienvenido!
                        </h1>
                        <h2 className="text-center text-xl font-medium">
                            Preparado para el cambio?
                        </h2>
                        <form
                            className="my-10 flex flex-col justify-center gap-5 w-64 self-center"
                            onSubmit={handleSubmit}
                        >
                            <input
                                className="rounded-lg p-4 border-2 border-primary-strong"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <input
                                className="rounded-lg p-4 border-2 border-primary-strong"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <p>Olvidaste tu contraseña?</p>

                            <button
                                type="submit"
                                className="w-full py-3 text-black font-bold rounded-lg shadow-lg
                bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90
                  hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
                            >
                                INICIA SESIÓN
                            </button>
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
