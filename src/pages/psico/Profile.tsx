import React, { useState } from 'react'
import  k  from "../../assets/images/register.jpg"
import iconEdit from "../../assets/icons/edit.svg"
import { useAuth } from "../../hooks/useAuth";
import { storage } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes } from "firebase/storage";

function Profile() {
  const { user } = useAuth();

  const [valueName, setValueName] = useState(user?.name);
  const [valueButtonName, setValueButtonName] = useState(true);

  const [valueEmail, setValueEmail] = useState(user?.email);
  const [valueButtonEmail, setValueButtonEmail] = useState(true);

  const [valuePhone, setValuePhone] = useState(user?.phone);
  const [valueButtonPhone, setValueButtonPhone] = useState(true);

  // const [valueBiography, setValueBiography] = useState(user?.biography);
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

  const [imageUpload, setImageUpload] = useState< Event | null >(null);
  const uploadImage = (event: any) => {
    if (imageUpload != null) {
      const imageRef = ref(storage, `imagesUsers/${user?.id}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("Imagen subida correctamente");
      });
  };

  // const handleInputBiography = (event: any) => {
  //   setValueBiography(event.target.value);
  // };

  return (
    <div className="pt-4">
      <h1 className="text-4xl font-bold pl-2">Editar información personal</h1>
      <div className="my-10 md:flex">

        <div className={`flex flex-col items-center ${user?.type == 1? "md:w-1/4 md:max-w-[483px] w-full":""}  ${user?.type == 2? "justify-center":""} md:ml-10`}>

          <div className="rounded-full w-2/3 border-8 border-primary-normal max-w-xs md:w-64 aspect-square overflow-hidden flex justify-center items-center">
            <img src={k} alt="profile-pic"/>
          </div>

          <div className="m-4 flex flex-col items-center justify-center">
            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}} className="flex items-center justify-center"/>
            <button onClick={uploadImage} className="w-auto h-12 p-2 rounded-xl bg-secondary-normal hover:scale-105 
            font-bold hover:drop-shadow-md transition-all mt-3">Subir imagen</button>
          </div>

          {
            user?.type == 2?           <>
            <div className="w-full mt-10 flex flex-col items-center">
              <h1 className="text-2xl font-bold pl-5 w-full">Biografia</h1>
              {/* {user?.biography != null? <textarea id="biography" className={`w-10/12 h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold max-w-sm`} disabled={valueButtonBiography}></textarea>:
                    <textarea id="biography" className={`w-10/12 h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold max-w-sm ${!valueButtonBiography? "bg-gray-300":""}`} placeholder="No tiene biografia" disabled={!valueButtonBiography}></textarea>} */}
              <button className="w-16 h-16 aspect-square mb-6 mt-2 p-3 border-4 border-primary-normal rounded-2xl bg-secondary-normal hover:scale-105" onClick={handleButtonName}>
                <img src={iconEdit} alt="edit" />
              </button>
            </div>

            <div className="w-full flex p-4 justify-around">
              <h1 className="text-xl font-bold pl-2 w-1/2 flex items-center">Precio de hora de consulta ($)</h1>
              <div className="w-1/2 items-center flex">
                <textarea id="price" className="w-[90px] m-2 rounded-xl border-4 border-secondary-normal h-12 mr-4 text-lg p-1" placeholder="$0"></textarea>
                <button className="w-[48px] h-auto p-2 border-4 border-primary-normal rounded-2xl bg-secondary-normal">
                  <img src={iconEdit} alt="edit" />
                </button>
              </div>
            </div>
          </> : <></>
          }



        </div>
        
        <div className="flex flex-col p-3 md:ml-12 md:w-1/2">

          <div className=" flex justify-between p-2 items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="pl-3 text-xl font-bold">Nombre completo</label>
              <div className="items-center flex">
                <input type="text" className={`h-12 rounded-xl border-4 border-secondary-normal
                 w-full max-w-xs md:max-w-sm p-2 ${valueButtonName? "bg-gray-300":""}`} 
                 value={valueName} onChange={handleInputName} disabled={valueButtonName}/>
                <button className="w-[48px] h-auto p-2 border-4 border-primary-normal
                 rounded-xl bg-secondary-normal ml-3 hover:scale-105" onClick={handleButtonName}>
                  <img src={iconEdit} alt="edit" />
                </button>
              </div>
            </div>
          </div>

          <div className=" flex justify-between p-2 items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="pl-3 text-xl font-bold">Dirección de correo</label>
              <div className="items-center flex">
                <input type="text" className={`h-12 rounded-xl border-4 border-secondary-normal
                 w-full max-w-xs md:max-w-sm p-2 ${valueButtonEmail? "bg-gray-300":""}`}
                  value={valueEmail} onChange={handleInputEmail} disabled/>
                {/* <button className="w-[48px] h-auto p-2 border-4 border-primary-normal
                 rounded-xl bg-secondary-normal ml-3 hover:scale-105" onClick={handleButtonEmail}>
                  <img src={iconEdit} alt="edit" />
                </button> */}
              </div>
            </div>
          </div>

          <div className=" flex justify-between p-2 items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="pl-3 text-xl font-bold">Número de telefono</label>
              <div className="items-center flex">
                {user?.phone != null? <input type="text" className={`h-12 rounded-xl border-4 border-secondary-normal
                 w-full max-w-xs md:max-w-sm p-2 ${valueButtonPhone ? "bg-gray-300":""}`}
                  value={valuePhone} onChange={handleInputPhone} disabled={valueButtonPhone}/>:
                 <input type="text" className={`h-12 rounded-xl border-4 border-secondary-normal
                  w-full max-w-xs p-2 ${!valueButtonPhone? "bg-gray-300":""}`} placeholder="No tiene un número de telefono" disabled={!valueButtonPhone}/>}
                <button className="w-[48px] h-auto p-2 border-4 border-primary-normal rounded-xl bg-secondary-normal ml-3 hover:scale-105" onClick={handleButtonPhone} >
                  <img src={iconEdit} alt="edit" />
                </button>
              </div>
            </div>
          </div>

          {user?.type == 2? <div className="bg-yellow-300 h-28 mt-8 max-w-md">
            Rating
          </div>:<></>}

          <div className="flex justify-center max-w-md mt-5">
            <button className="w-auto h-12 p-2 rounded-xl bg-secondary-normal hover:scale-105 
            font-bold hover:drop-shadow-md transition-all">Guardar cambios</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile