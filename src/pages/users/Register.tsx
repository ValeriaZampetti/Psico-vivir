import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import registerImage from "../../assets/images/Register.jpg";
import arrow from "../../assets/icons/arrow.svg";
import xImage from "../../assets/icons/x.svg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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

  const { register, logInWithGoogle, logInWithGithub } = useAuth();
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

  function handleContinue() {
    if (!validForm()) return;

    setStep(STEP_VIEW_DOCTOR);
  }

  function validForm() {
    if (password.length <= 7) {
      toast.warning("La contraseña debe tener al menos 8 caracteres");
      return false;
    }

    if (!email || !password || !nombre || !phone || !confirmarcontraseña) {
      toast.warning("No puedes dejar espacios en blanco", {
        position: "top-right",
      });
      return false;
    }

    if (password !== confirmarcontraseña) {
      toast.warning("Las contraseñas no coinciden");
      return false;
    }

    //Estas validaciones son cuando eres doctor y estas en el segundo formulario

    if (step === STEP_VIEW_DOCTOR) {
      if (biography.length < 40) {
        toast.warning("La biografía debe tener al menos 40 caracteres");
        return false;
      }

      if (selectedSpecialties.length < 2) {
        toast.warning("Debes seleccionar al menos 2 especialidades");
        return false;
      }
    }
    return true;
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!validForm()) return;

    try {
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
          completed: true,
        };
        console.log("FUNCIONAAAA");

        const userCredential = await register(doctor, password);
        console.log("AAAAA");

        if (userCredential) {
          toast.success("Usuario creado exitosamente", {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/psico");
          }, 3000);
        } else {
          toast.error("Error al crear el usuario");
        }

        return;
      }

      const client: ClientCreate = {
        name: nombre,
        email,
        phone: parseInt(phone),
        countryCode,
        type: tipoUsuario,
        completed: true,
      };

      const userCredential = await register(client, password);
      if (userCredential) {
        toast.success("Usuario creado exitosamente");
        setTimeout(() => {
          navigate("/psico");
        }, 3000);
      } else {
        toast.error("Error al crear el usuario");
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

        case "auth/email-already-in-use":
          toast.error("El email ya está en uso");
          break;

        case "auth/weak-password":
          toast.error("La contraseña debe tener al menos 8 caracteres");
          break;

        case "auth/invalid-credential":
          toast.error("Credenciales inválidas");
          break;

        case "auth/invalid-verification-code":
          toast.error("Código de verificación inválido");
          break;

        case "auth/invalid-verification-id":
          toast.error("ID de verificación inválido");
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

  const clientForm = (
    <form
      className=" self-center"
      // onSubmit={handleSubmit}
    >
      <section className="my-10 flex flex-col sm:flex-row justify-center gap-5 self-center ">
        <div className="flex flex-col gap-5 w-full">
          <input
            className="rounded-lg p-4 border-2 border-primary-strong outline-none w-full"
            placeholder="Ingrese su nombre y apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></input>

          <input
            className="rounded-lg p-4 border-2 border-primary-strong outline-none w-full"
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

        <div className="flex flex-col gap-5 w-full">
          {/* <div> */}
          <PhoneInput
            className="rounded-lg p-4 border-2 border-primary-strong outline-none w-full"
            placeholder="Número de teléfono"
            value={phone}
            onChange={(value) => setPhone(value || "")}
          />
          {/* </div> */}
          <input
            className="rounded-lg p-4 border-2 border-primary-strong outline-none w-full"
            placeholder="Contraseña"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <input
            className="rounded-lg p-4 border-2 border-primary-strong w-full"
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
          onClick={handleContinue}
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
  );

  const doctorForm = (
    <form
      className="my-10 flex flex-col justify-center gap-5 self-center"
      // onSubmit={handleSubmit}
    >
      <section className="my-10 flex flex-col justify-center gap-5 self-center w-full">
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
                          specialties.filter((item) => item.id !== specialty.id)
                        );
                      },
                    };
                  })
                : []
            }
          />

          {selectedSpecialties.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2">
              {selectedSpecialties.map((specialty, index) => (
                <div
                  key={index}
                  className="bg-quaternary-normal px-4 py-1 rounded-xl
                  flex flex-row justify-center items-center gap-2"
                >
                  <p className="text-black">{specialty}</p>
                  <img
                    src={xImage}
                    className="h-4"
                    onClick={() => {
                      setSelectedSpecialties(
                        selectedSpecialties.filter((item) => item !== specialty)
                      );
                      setSpecialties([
                        ...specialties,
                        { id: specialty, name: specialty },
                      ]);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <textarea
          className="rounded-lg p-4 border-2 border-primary-strong outline-none"
          placeholder="Escribe tu biografia aqui..."
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </section>

      <div className="flex flex-row flex-wrap justify-center gap-4 w-full">
        <button
          onClick={() => setStep(STEP_VIEW_CLIENT)}
          className="w-10 py-3 text-black font-bold rounded-lg shadow-lg flex flex-row justify-evenly duration-300 bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90 hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
        >
          <img src={arrow} className="h-5 w-auto rotate-180" />
        </button>
        <button
          // type="submit"
          onClick={handleSubmit}
          className="min-w-[10rem] py-3 text-black font-bold rounded-lg shadow-lg duration-300 bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90 hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
        >
          REGISTRARSE
        </button>
      </div>
    </form>
  );

  // FIXME - Arreglar responsive overflow de inputs
  return (
    <div className="bg-gray-300/40 px-14 py-7">
      <div
        className="backdrop-blur-lg bg-white  drop-shadow-lg
            flex flex-row p-6 rounded-2xl justify-center"
      >
        <div className="w-[50%] lg:flex hidden justify-center">
          <img
            src={registerImage}
            className="h-[45rem] w-[30rem]  rounded-lg"
          />
        </div>
        <main className="flex flex-col  justify-center lg:w-[50%]">
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

          {step === STEP_VIEW_CLIENT && clientForm}
          {step === STEP_VIEW_DOCTOR && doctorForm}
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
  );
};

export default Register;
