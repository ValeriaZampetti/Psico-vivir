import React, { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import registerr from "../../assets/images/Register.jpg";
import arrow from "../../assets/icons/arrow.svg";
import { Client, ClientCreate, Doctor } from "../../interfaces/Client";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { Dropdown } from "../../components/forms/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

export const Register = (prop: any) => {
  const [nombre, setNombre] = useState("");
  const [number, setnumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarcontraseña, setconfirmarcontraseña] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(1);

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();


  // FIXME - Hacer que el form se resetee cuando se cambia el tipo de usuario
  // FIXME - Utilizar esto en el submit
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("submit")
    e.preventDefault();
    const user: ClientCreate | null = {
      email: email,
      name: nombre,
      type: 0,
    };

    if (password.length <= 7) {
      toast.warning("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (
      email === "" ||
      password === "" ||
      nombre === "" ||
      number === "" ||
      confirmarcontraseña === ""
    ) {
      toast.warning("No puedes dejar espacios en blanco", {
        position: "top-right",
      });
      return;
    }

    if (password !== confirmarcontraseña) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    const userCredential = await register(user, password);
    if (userCredential) {
      toast.success("Usuario creado exitosamente");
      setTimeout(() => {
        navigate("/psico");
      }, 2000);
    } else {
      toast.error("Error al crear el usuario");
    }
  }
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/psico");
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión con Google");
    }
  };
  const handleGithubSignIn = async () => {
    // await loginWithGithub();
    // navigate("/psico");
  };

  const registerButton = (
    <button
      // type="submit"
      onClick={handleSubmit}
      className="w-full py-3 text-black font-bold rounded-lg shadow-lg duration-300
  bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90
    hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
    >
      REGISTRARSE
    </button>
  );

  const continueDoctorButton = (
    <button
      onClick={() => {
        console.log("Tiene que cambiar todo el form");
      }}
      className="w-full py-3 text-black font-bold rounded-lg shadow-lg flex flex-row justify-evenly duration-300
    bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90
        hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
    >
      <p className="ml-2">CONTINUAR</p>
      <img src={arrow} className="h-5 w-auto" />
    </button>
  );

  // FIXME - Arreglar responsive overflow de inputs
  return (
    <>
      <div className="bg-gray-300/40 px-14 py-7">
        <div
          className="backdrop-blur-lg bg-white  drop-shadow-lg
            flex flex-row p-6 rounded-2xl justify-center"
        >
          <div className="w-[50%] lg:flex hidden justify-center">
            <img src={registerr} className="h-[45rem] w-[30rem]  rounded-lg" />
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
            <h1 className="text-2xl font-bold text-center">Bienvenido!</h1>
            <h2 className="text-center text-xl font-medium">
              Registrate ingresando los siguientes datos
            </h2>

            <form className="self-center" onSubmit={handleSubmit}>
              <section className="my-10 flex flex-col sm:flex-row justify-center gap-5 w-64 self-center ">
                <div className="flex flex-col gap-5">
                  <input
                    className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                    placeholder="Ingrese su nombre y apellido"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  ></input>

                    <input
                      className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <Dropdown
                      title="Tipo de usuario"
                      options={[
                        {
                          value: "Cliente",
                          label: "Cliente",
                          onClick: () => setTipoUsuario(1),
                        },
                        {
                          value: "Doctor",
                          label: "Doctor",
                          onClick: () => setTipoUsuario(2),
                        },
                      ]}
                    />
                  </div>

                  <div className="flex flex-col gap-5">
                    <input
                      className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                      placeholder="Número de teléfono"
                      value={number}
                      onChange={(e) => setnumber(e.target.value)}
                    ></input>

                    <input
                      className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                      placeholder="Contraseña"
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>

                    <input
                      className="rounded-lg p-4 border-2 border-primary-strong"
                      placeholder="Confirmar contraseña"
                      value={confirmarcontraseña}
                      type="password"
                      onChange={(e) => setconfirmarcontraseña(e.target.value)}
                    ></input>
                  </div>
                </section>
              )}

              {/* TODO - Cambiar bg-green */}
              {tipoUsuario == 2 ? continueDoctorButton : registerButton}
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

export default Register;
