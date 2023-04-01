import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown } from "../../components/forms/Dropdown";
import { getSpecialties, getUserById } from "../../firebase/api/userService";
import { useAuth } from "../../hooks/useAuth";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  UserType,
  DoctorCreate,
  ClientCreate,
  UserNotAuthCreate,
  UserNotAuth,
} from "../../interfaces/Client";
import { Specialty } from "../../interfaces/Specialty";
import registerImage from "../../assets/images/Register.jpg";
import arrow from "../../assets/icons/arrow.svg";
import xImage from "../../assets/icons/x.svg";

const STEP_VIEW_CLIENT = 1;
const STEP_VIEW_DOCTOR = 2;

function CompleteRegister() {
  const [nombre, setNombre] = useState("");

  const [phone, setPhone] = useState("");

  const [biography, setBiography] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const [tipoUsuario, setTipoUsuario] = useState(UserType.CLIENT);
  const [step, setStep] = useState(STEP_VIEW_CLIENT);

  const { completeRegister } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();
  const [userFromUrl, setUserFromUrl] = useState<UserNotAuth | null>(null);

  async function getUser() {
    const user = await getUserById(id ?? "");

    if (user) {
      setUserFromUrl(user);
      setNombre(user.name);
    }
  }

  async function getSpecialtiesFromApi() {
    const specialties = await getSpecialties();
    setSpecialties(specialties);
    console.log(specialties);
  }

  useEffect(() => {
    getSpecialtiesFromApi();
    getUser();
  }, []);

  function validForm() {
    if (!nombre || !phone) {
      toast.warning("No puedes dejar espacios en blanco", {
        position: "top-right",
      });
      return false;
    }

    if (phone.length !== 13) {
      toast.warning("El número de teléfono debe tener 13 dígitos");
      return false;
    }

    //Estas validaciones son cuando eres doctor y estas en el segundo formulario
    if (step === STEP_VIEW_DOCTOR) {
      if (biography.length < 40) {
        toast.warning("La biografía debe tener al menos 40 caracteres");
        return false;
      }

      if (selectedSpecialties.length < 2 || selectedSpecialties.length > 5) {
        toast.warning("Debes seleccionar de 2 a 5 especialidades");
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
          email: userFromUrl?.email ?? "",
          phone: phone,
          type: tipoUsuario,
          biography,
          ranking: 3,
          specialties: selectedSpecialties,
          numberOfReviews: 0,
          completed: true,
          img: "gs://psico-vivir.appspot.com/imagesUsers/default.png",
        };

        const completed = await completeRegister(doctor, userFromUrl?.id ?? "");

        if (completed) {
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
        email: userFromUrl?.email ?? "",
        phone: phone,
        type: tipoUsuario,
        completed: true,
        img: "gs://psico-vivir.appspot.com/imagesUsers/default.png",
      };

      const completed = await completeRegister(client, userFromUrl?.id ?? "");

      if (completed) {
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

  const clientForm = (
    <form
      className="flex flex-col justify-center self-center w-[90%]"
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
        </div>
      </section>

      {/* TODO - Cambiar bg-green */}
      {tipoUsuario == UserType.DOCTOR ? (
        <button
          onClick={() => setStep(STEP_VIEW_DOCTOR)}
          className="min-w-[6rem] w-full max-w-[10rem] py-3 text-black font-bold rounded-lg shadow-lg 
            flex flex-row justify-evenly duration-300 bg-primary-light self-center
            hover:bg-primary-normal hover:scale-95 active:scale-90 
            hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
        >
          <p className="max-[320px]:hidden">Continuar</p>
          <img src={arrow} className="h-5 w-auto" />
        </button>
      ) : (
        <button
          // type="submit"
          onClick={handleSubmit}
          className="min-w-[6rem] w-full max-w-[10rem] py-3 text-black font-bold rounded-lg shadow-lg 
          duration-300 bg-primary-light hover:bg-primary-normal 
          hover:scale-95 active:scale-90 self-center 
          hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100"
        >
          Registrarse
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
          <h1 className="text-2xl font-bold text-center break-words">
            Bienvenido de vuelta!
          </h1>
          <h2 className="text-center text-xl font-medium break-words">
            Completa tu perfil para continuar
          </h2>
          {/* FIXME - Averiguar por que el submit no se ejecuta */}

          {step === STEP_VIEW_CLIENT && clientForm}
          {step === STEP_VIEW_DOCTOR && doctorForm}
        </main>
      </div>
    </div>
  );
}

export default CompleteRegister;
