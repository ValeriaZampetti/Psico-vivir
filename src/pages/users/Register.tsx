import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import registerr from "../../assets/images/Register.jpg";
import arrow from "../../assets/icons/arrow.svg";
import {
  Client,
  ClientCreate,
  UserType,
  Doctor,
  DoctorCreate,
} from "../../interfaces/Client";
import googleIcon from "../../assets/icons/google.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { Dropdown } from "../../components/forms/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { getSpecialties } from "../../firebase/api/UserService";
import { Specialty } from "../../interfaces/Specialty";

const STEP_VIEW_CLIENT = 1;
const STEP_VIEW_DOCTOR = 2;

export const Register = (prop: any) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<number>(58);

  const [biography, setBiography] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const [confirmarcontraseña, setconfirmarcontraseña] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(UserType.CLIENT);
  const [step, setStep] = useState(STEP_VIEW_CLIENT);

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getSpecialtiesFromApi() {
      const specialties = await getSpecialties();
      setSpecialties(specialties);
      console.log(specialties);
    }

    getSpecialtiesFromApi();
  }, []);

  // FIXME - Hacer que el form se resetee cuando se cambia el tipo de usuario
  // FIXME - Utilizar esto en el submit

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (password.length <= 7) {
      toast.warning("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (!email || !password || !nombre || !phone || !confirmarcontraseña) {
      toast.warning("No puedes dejar espacios en blanco", {
        position: "top-right",
      });
      return;
    }

    if (password !== confirmarcontraseña) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }

    if (tipoUsuario === UserType.DOCTOR) {
      const doctor: DoctorCreate = {
        name: nombre,
        email,
        phone: parseInt(phone),
        countryCode,
        type: tipoUsuario,
        biography,
        ranking: 3,
        specialties: selectedSpecialties,
        numberOfReviews: 0,
      };

      return;
    }

    const client: ClientCreate = {
      name: nombre,
      email,
      phone: parseInt(phone),
      countryCode,
      type: tipoUsuario,
    };

    const userCredential = await register(client, password);
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

  // FIXME - Arreglar responsive overflow de inputs
  return (
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
          {/* FIXME - Averiguar por que el submit no se ejecuta */}

          {step === STEP_VIEW_CLIENT ? (
            //TODO - Poner esto a un componente
            <form
              className="self-center"
              // onSubmit={handleSubmit}
            >
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
                        onClick: () => setTipoUsuario(UserType.CLIENT),
                      },
                      {
                        value: "Doctor",
                        label: "Doctor",
                        onClick: () => setTipoUsuario(UserType.DOCTOR),
                      },
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <input
                      className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                      placeholder="Número de teléfono"
                      type="number"
                      pattern="[0-9]*"
                      value={phone}
                      onChange={(e) =>
                        setPhone((v) =>
                          e.target.validity.valid ? e.target.value : v
                        )
                      }
                    />
                  </div>
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

              {/* TODO - Cambiar bg-green */}
              {tipoUsuario == UserType.DOCTOR ? (
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 text-black font-bold rounded-lg shadow-lg flex flex-row justify-evenly duration-300 bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90 hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
                >
                  <p className="ml-2">CONTINUAR</p>
                  <img src={arrow} className="h-5 w-auto" />
                </button>
              ) : (
                <button
                  // type="submit"
                  onClick={handleSubmit}
                  className="w-full py-3 text-black font-bold rounded-lg shadow-lg duration-300 bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90 hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
                >
                  REGISTRARSE
                </button>
              )}
            </form>
          ) : (
            //Formulario para el doctor
            <form
              className="self-center"
              // onSubmit={handleSubmit}
            >
              <section className="my-10 flex flex-row sm:flex-row justify-center gap-5 w-64 self-center ">
                <div className="flex flex-row gap-5">
                  <textarea
                    className="rounded-lg p-4 border-2 border-primary-strong outline-none"
                    placeholder="Escribe tu biografia aqui..."
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <Dropdown
                    title="Especialidades"
                    options={
                      specialties
                        ? specialties.map((specialty) => {
                            return {
                              value: specialty.id,
                              label: specialty.name,
                              onClick: () => {
                                setSelectedSpecialties([
                                  ...selectedSpecialties,
                                  specialty.id,
                                ]);
                                setSpecialties(
                                  specialties.filter(
                                    (item) => item.id !== specialty.id
                                  )
                                );
                              },
                            };
                          })
                        : []
                    }
                  />
                </div>
              </section>

              {/* TODO - Cambiar bg-green */}
              {tipoUsuario == UserType.DOCTOR && step === STEP_VIEW_CLIENT ? (
                <button
                  onClick={() => setStep(STEP_VIEW_DOCTOR)}
                  className="w-full py-3 text-black font-bold rounded-lg shadow-lg flex flex-row justify-evenly duration-300 bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90 hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
                >
                  <p className="ml-2">CONTINUAR</p>
                  <img src={arrow} className="h-5 w-auto" />
                </button>
              ) : (
                <button
                  // type="submit"
                  onClick={handleSubmit}
                  className="w-full py-3 text-black font-bold rounded-lg shadow-lg duration-300 bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90 hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
                >
                  REGISTRARSE
                </button>
              )}
            </form>
          )}
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
  );
};

export default Register;
