import React, { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import register from "../../assets/images/Register.jpg";
import { createUser } from "../../firebase/api";
import { Client, Doctor } from "../../interfaces/Client";
export const Register = (prop: any) => {
    const [nombre, setNombre] = useState("");
    const [number, setnumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarcontraseña, setconfirmarcontraseña] = useState("");
    const [tipousuario, settipousuario] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const user: Client = {
            email: email,
            name: nombre,
            type: 0,
        };

        if (tipousuario === "Doctor") {
            user.type = 1;
        }

        createUser(user, password);
    }
    return (
        <>
            <div className="bg-gray-200/[0.8] flex flex-row p-5 rounded-lg justify-center">
                <div className="basis-1/2 lg:block hidden">
                    <img src={register} className="h-full w-auto  rounded-lg" />
                </div>
                <main className="flex flex-col  justify-center lg:basis-1/2">
                    <p className="text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            to="/users/Login"
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                    <h1 className="text-2xl font-bold text-center">
                        Bienvenido!
                    </h1>
                    <h2 className="text-center text-xl font-medium">
                        Registrate ingresando los siguientes datos
                    </h2>
                    <form className="self-center" onSubmit={handleSubmit}>
                        <section className="my-10 flex flex-col sm:flex-row justify-center gap-5 w-64 self-center ">
                            <div className="flex flex-col gap-5">
                                <input
                                    className="rounded-lg p-4 focus:outline-pink-400"
                                    placeholder="Ingrese su nombre y apellido"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                ></input>

                                <input
                                    className="rounded-lg p-4 focus:outline-pink-400"
                                    placeholder="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>

                                <input
                                    className="rounded-lg p-4 focus:outline-pink-400"
                                    placeholder="Tipo de usuario"
                                    value={tipousuario}
                                    onChange={(e) =>
                                        settipousuario(e.target.value)
                                    }
                                ></input>
                            </div>

                            <div className="flex flex-col gap-5">
                                <input
                                    className="rounded-lg p-4 focus:outline-pink-400"
                                    placeholder="Número de teléfono"
                                    value={number}
                                    onChange={(e) => setnumber(e.target.value)}
                                ></input>

                                <input
                                    className="rounded-lg p-4 focus:outline-pink-400"
                                    placeholder="password"
                                    value={password}
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>

                                <input
                                    className="rounded-lg p-4 focus:outline-pink-400"
                                    placeholder="Confirmar contraseña"
                                    value={confirmarcontraseña}
                                    type="password"
                                    onChange={(e) =>
                                        setconfirmarcontraseña(e.target.value)
                                    }
                                ></input>
                            </div>
                        </section>

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

export default Register;
