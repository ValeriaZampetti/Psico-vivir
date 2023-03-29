import React, { useEffect, useState } from "react";
import k from "../../assets/images/register.jpg";
import iconEdit from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";
import { storage } from "../../firebase/config";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { Doctor, UserType } from "../../interfaces/Client";
import StarRating from "../../components/forms/StarRating";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { toast } from "react-toastify";
import { getSpecialties } from "../../firebase/api/userService";
import { Specialty } from "../../interfaces/Specialty";
import { Dropdown } from "../../components/forms/Dropdown";
import xImage from "../../assets/icons/x.svg";


function Profile() {
  const { user, updateUser } = useAuth();

  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const [valueName, setValueName] = useState(user?.name ?? "");
  const [valueButtonName, setValueButtonName] = useState(true);

  const [valueEmail, setValueEmail] = useState(user?.email ?? "");
  const [valueButtonEmail, setValueButtonEmail] = useState(true);

  const [valuePhone, setValuePhone] = useState(user?.phone ?? "");
  const [valueButtonPhone, setValueButtonPhone] = useState(true);

  const [valueBiography, setValueBiography] = useState(
    user?.type === UserType.DOCTOR
      ? (user as Doctor | null)?.biography ?? ""
      : ""
  );
  const [valueButtonBiography, setValueButtonBiography] = useState(true);

  const handleInputName = (event: any) => {
    setValueName(event.target.value);
  };
  const handleButtonName = (event: any) => {
    setValueButtonName(!valueButtonName);
  };

  const handleInputEmail = (event: any) => {
    setValueEmail(event.target.value);
  };

  const handleButtonPhone = (event: any) => {
    setValueButtonPhone(!valueButtonPhone);
  };

  const [imageUpload, setImageUpload] = useState<
    Blob | Uint8Array | ArrayBuffer | null
  >(null);

  function selectSpecialty(specialty: Specialty) {
    if (selectedSpecialties.length === 5) {
      toast.error("No puedes seleccionar más de 5 especialidades");
      return;
    }
    setSelectedSpecialties([...selectedSpecialties, specialty.id]);
    setSpecialties(specialties.filter((item) => item.id !== specialty.id));
  }

  function removeSpecialty(specialty: string) {
    setSelectedSpecialties(
      selectedSpecialties.filter((item) => item !== specialty)
    );
    setSpecialties([...specialties, { id: specialty, name: specialty }]);
  }


  useEffect(() => {
    async function getSpecialtiesFromApi() {
      if (user === null || user.type === UserType.CLIENT) return;
      const specialties = await getSpecialties();
      setSpecialties(
        specialties.filter(
          (specialty) =>
            !(user as Doctor).specialties.includes(specialty.id)
        )
      );
    }

    getSpecialtiesFromApi();
    setSelectedSpecialties(
      user?.type === UserType.DOCTOR
        ? (user as Doctor).specialties
        : []
    )
  }, [user]);

  

  function uploadImage() {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `imagesUsers/${user?.id}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      user!.img = user!.id;
    });
  }

  function validateValues(): boolean {
    if (valueName === "") {
      toast.error("El nombre no puede estar vacío");
      return false;
    }

    if (valueEmail === "") {
      toast.error("El correo no puede estar vacío");
      return false;
    }

    if (valuePhone.length !== 13) {
      toast.warning("El número de teléfono debe tener 13 dígitos");
      return false;
    }

    if (user?.type === UserType.DOCTOR) {
      if (valueBiography.length < 40) {
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

  function saveChanges(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (user === null) return;

    if (!validateValues()) return;

    try {
      user.name = valueName;
      user.phone = valuePhone;
      uploadImage();

      if (user.type === UserType.DOCTOR) {
        (user as Doctor).biography = valueBiography;

        (user as Doctor).specialties = selectedSpecialties;
      }

      updateUser(user, user.id);

      setValueButtonBiography(true);
      setValueButtonEmail(true);
      setValueButtonName(true);

      toast.success("Cambios guardados");
    } catch (error) {
      toast.error("Error al guardar cambios");
    }
  }

  const doctorInputs = (
    <>
      <section id="Rating" className="flex flex-col justify-center gap-y-2">
        <h1 className="text-xl font-bold pl-5 w-ful text-center">Rating</h1>
        <StarRating
          readonly={true}
          currentRating={
            user?.type === UserType.DOCTOR ? (user as Doctor).ranking : 0
          }
          svgClass="h-[2rem]"
        />
      </section>

      <section
        id="Specialties"
        className="flex flex-col justify-center gap-y-2
        backdrop-blur-lg bg-[#dceee6]  drop-shadow-lg px-3  md:px-6 py-3 rounded-2xl"
      >
        <div>
          <Dropdown
            title="Especialidades"
            changeTitle={false}
            options={
              specialties
                ? specialties.map((specialty) => {
                    return {
                      value: specialty.id,
                      label: specialty.name,
                      onClick: () => {
                        selectSpecialty(specialty);
                      },
                    };
                  })
                : []
            }
          />
        </div>

        <div className="flex flex-row flex-wrap gap-2 w-[80%] justify-center self-center">
          {user?.type === UserType.DOCTOR &&
            selectedSpecialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-quaternary-normal px-4 py-1 rounded-xl
                  flex flex-row justify-center items-center gap-2"
              >
                <p className="text-black">{specialty}</p>
                <img
                  src={xImage}
                  className="h-4 cursor-pointer"
                  onClick={() => {
                    removeSpecialty(specialty);
                  }}
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
  // const gsReference = ref(
  //   storage,
  //   "gs://psico-vivir.appspot.com/imagesUsers/aiudaporfavor.jpg"
  // );
  // const img = document.getElementById("profile-pic");
  // getDownloadURL(gsReference).then((url) => {
  //   const img = document.getElementById("profile-pic");
  //   img?.setAttribute("src", url);
  // });

  // const handleInputBiography = (event: any) => {
  //   setValueBiography(event.target.value);
  // };

  return (
    <div className="px-14 py-7 bg-quaternary-normal">
      <main
        className="backdrop-blur-lg bg-white  drop-shadow-lg
            p-6 rounded-2xl justify-center"
      >
        <h1 className="text-4xl font-bold pl-2 md:ml-5">
          Editar información personal
        </h1>
        <div className="my-10 md:flex">
          <div
            className={`flex flex-col items-center ${
              user?.type == 1 ? "md:w-1/4 md:max-w-[483px] w-full" : ""
            }  ${user?.type == 2 ? "justify-center" : ""} md:ml-10`}
          >
            <div className="rounded-full w-2/3 border-8 border-primary-normal max-w-xs md:w-64 aspect-square overflow-hidden flex justify-center items-center">
              <img src={k} id="profile-pic" alt="profile-pic" />
            </div>

            <div className="m-4 flex flex-col items-center justify-center">
              <label
                htmlFor="imageUpload"
                className="text-black bg-quaternary-normal border-2 border-primary-normal
          focus:ring-4 outline-none duration-300 focus:ring-blue-300 cursor-pointer
          font-medium rounded-lg px-4 py-2 active:scale-90"
              >
                Cambiar imagen
              </label>

              {/* FIXME - Hacer que la imagen se muestre al cambiarla */}
              <input
                id="imageUpload"
                type="file"
                onChange={(event) => {
                  setImageUpload(
                    event.target.files ? event.target.files[0] : null
                  );
                }}
                className="hidden"
              />
            </div>

            {user?.type == 2 ? (
              <>
                <div className="w-full mt-10 flex flex-col items-center">
                  <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-2xl font-bold pl-5 w-full">
                      Biografia
                    </h1>

                    <button
                      className="w-12 h-12 aspect-square p-3 border-4 border-primary-normal rounded-2xl bg-secondary-normal hover:scale-105"
                      onClick={(e) =>
                        setValueButtonBiography(!valueButtonBiography)
                      }
                    >
                      <img src={iconEdit} alt="edit" />
                    </button>
                  </div>

                  {user.type === UserType.DOCTOR && (
                    <textarea
                      id="biography"
                      className={`w-10/12 h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold max-w-sm`}
                      value={valueBiography}
                      onChange={(e) => setValueBiography(e.target.value)}
                      disabled={valueButtonBiography}
                    />
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="flex flex-col p-3 md:ml-12 md:w-1/2 gap-y-4">
            <div className=" flex justify-between p-2 items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="pl-3 text-xl font-bold">
                  Nombre completo
                </label>

                <div className="items-center flex">
                  <input
                    type="text"
                    className={`h-12 rounded-xl border-4 border-secondary-normal
                      w-full max-w-xs md:max-w-sm p-2 ${
                        valueButtonName ? "bg-gray-300" : ""
                      }`}
                    value={valueName}
                    onChange={handleInputName}
                    disabled={valueButtonName}
                  />
                  <button
                    className="w-[48px] h-auto p-2 border-4 border-primary-normal
                      rounded-xl bg-secondary-normal ml-3 hover:scale-105"
                    onClick={handleButtonName}
                  >
                    <img src={iconEdit} alt="edit" />
                  </button>
                </div>
              </div>
            </div>

            <div className=" flex justify-between p-2 items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="pl-3 text-xl font-bold">
                  Dirección de correo
                </label>
                <div className="items-center flex">
                  <input
                    type="text"
                    className={`h-12 rounded-xl border-4 border-secondary-normal
                 w-full max-w-xs md:max-w-sm p-2 ${
                   valueButtonEmail ? "bg-gray-300" : ""
                 }`}
                    value={valueEmail}
                    onChange={handleInputEmail}
                    disabled
                  />
                  {/* <button className="w-[48px] h-auto p-2 border-4 border-primary-normal
                 rounded-xl bg-secondary-normal ml-3 hover:scale-105" onClick={handleButtonEmail}>
                  <img src={iconEdit} alt="edit" />
                </button> */}
                </div>
              </div>
            </div>

            <div className=" flex justify-between p-2 items-center">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="pl-3 text-xl font-bold">
                  Número de telefono
                </label>

                <div className="items-center flex">
                  <PhoneInputWithCountrySelect
                    readOnly={valueButtonPhone}
                    className="rounded-lg p-4 border-2 border-primary-strong outline-none max-w-xs md:w-full w-2/3"
                    value={valuePhone!}
                    onChange={(value) => setValuePhone(value || "")}
                  />

                  <button
                    className="w-[48px] flex-shrink-0 h-auto p-2 border-4 border-primary-normal rounded-xl bg-secondary-normal ml-3 hover:scale-105"
                    onClick={handleButtonPhone}
                  >
                    <img src={iconEdit} alt="edit" />
                  </button>
                </div>
              </div>
            </div>

            {user?.type == UserType.DOCTOR && doctorInputs}

            <div className="flex justify-center max-w-md mt-5">
              <button
                onClick={saveChanges}
                className="w-auto h-12 p-2 rounded-xl bg-secondary-normal hover:scale-105 
            font-bold hover:drop-shadow-md transition-all"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
