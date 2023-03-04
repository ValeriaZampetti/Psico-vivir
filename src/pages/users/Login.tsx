import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/navigation/Footer";
import { NavLog } from "../../components/NavLog";
import psicoLogin from "../../assets/images/psicoLogin.jpeg";
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

    return (
        <>
            <div className="bg-gray-200/[0.8] flex flex-row p-5 rounded-lg justify-center">
                <div className="w-[50%] lg:block hidden">
                    <img
                        src={psicoLogin}
                        className="w-full h-full rounded-lg"
                    />
                </div>
                <main className="flex flex-col  justify-center lg:w-[50%]">
                    <p className="text-center">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            to="/register"
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
                    <form className="my-10 flex flex-col justify-center gap-5 w-64 self-center">
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
                        <p>Olvidaste tu contrasena?</p>

                        {/* TODO - Cambiar bg-green */}
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="w-full py-3 text-black font-bold uppercase rounded bg-primary hover:bg-secondary active:bg-green-400 hover:shadow-lg cursor-pointer
                            hover:cursos-pointer hover:cursor-pointer  transition-colors mb-5"
                        />
                    </form>

                    <footer className="mb-5">
                        <p className="text-center">O inicia sesión con</p>
                        <div className="flex justify-center gap-5 mt-5">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                <i className="fab fa-google"></i>
                            </button>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
};

export default LogIn;
