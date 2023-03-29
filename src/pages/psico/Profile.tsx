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

function Profile() {
  const { user, updateUser } = useAuth();

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const [valueName, setValueName] = useState(user?.name);
  const [valueButtonName, setValueButtonName] = useState(true);

  const [valueEmail, setValueEmail] = useState(user?.email);
  const [valueButtonEmail, setValueButtonEmail] = useState(true);

  const [valuePhone, setValuePhone] = useState(user?.phone ?? "");
  const [valueButtonPhone, setValueButtonPhone] = useState(true);

  // const [valueBiography, setValueBiography] = useState((user as Doctor?)?.biography ?? "");
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
  const handleButtonEmail = (event: any) => {
    setValueButtonEmail(!valueButtonEmail);
  };

  const handleInputPhone = (event: any) => {
    setValuePhone(event.target.value);
  };
  const handleButtonPhone = (event: any) => {
    setValueButtonPhone(!valueButtonPhone);
  };

  const [imageUpload, setImageUpload] = useState<
    Blob | Uint8Array | ArrayBuffer | null
  >(null);

  useEffect(() => {
    if (user?.type === UserType.DOCTOR) {
      setDoctor(user as Doctor);
    }
  }, [user]);

  const doctorInputs = (
    <>
      <section id="Rating" className="flex flex-col justify-center gap-y-2">
        <h1 className="text-xl font-bold pl-5 w-ful text-center">Rating</h1>
        <StarRating
          readonly={true}
          currentRating={doctor?.ranking ?? 0}
          svgClass="h-[2rem]"
        />
      </section>

      <section
        id="Specialties"
        className="flex flex-col justify-center gap-y-2
        backdrop-blur-lg bg-[#dceee6]  drop-shadow-lg px-3  md:px-6 py-3 rounded-2xl"
      >
        <h1 className="text-xl md:text-xl font-bold pl-5 w-full text-center">
          Especialidades
        </h1>

        <div className="flex flex-row flex-wrap gap-2 w-[80%] justify-center self-center">
          {doctor?.specialties.map((specialty, index) => (
            <div
              key={index}
              className="bg-quaternary-normal px-4 py-1 rounded-xl
                  flex flex-row justify-center items-center gap-2"
            >
              <p className="text-black">{specialty}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const uploadImage = (event: any) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `imagesUsers/${user?.id}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      user!.img = user!.id;
    });
  };
  // const saveChanges = () => {
  //   user.
  // };

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

              {/* <button
                onClick={uploadImage}
                className="w-auto h-12 p-2 rounded-xl bg-secondary-normal hover:scale-105 
            font-bold hover:drop-shadow-md transition-all mt-3"
              >
                Subir imagen
              </button> */}
            </div>

            {user?.type == 2 ? (
              <>
                <div className="w-full mt-10 flex flex-col items-center">
                  <h1 className="text-2xl font-bold pl-5 w-full">Biografia</h1>
                  {doctor?.biography != null && (
                    // <textarea
                    //   id="biography"
                    //   className={`w-10/12 h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold max-w-sm`}
                    //   value={valueBiography}
                    //   disabled={valueButtonBiography}
                    // ></textarea>
                    <></>
                  )}
                  <button
                    className="w-16 h-16 aspect-square mb-6 mt-2 p-3 border-4 border-primary-normal rounded-2xl bg-secondary-normal hover:scale-105"
                    onClick={handleButtonName}
                  >
                    <img src={iconEdit} alt="edit" />
                  </button>
                </div>

                <div className="w-full flex p-4 justify-around">
                  <h1 className="text-xl font-bold pl-2 w-1/2 flex items-center">
                    Precio de hora de consulta ($)
                  </h1>
                  <div className="w-1/2 items-center flex">
                    <textarea
                      id="price"
                      className="w-[90px] m-2 rounded-xl border-4 border-secondary-normal h-12 mr-4 text-lg p-1 bg-gray-300"
                      disabled
                    >
                      $20
                    </textarea>
                  </div>
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
