import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import a from "../../assets/mock/profile.png";
import k from "../../assets/images/default.png";
import { getDoctorById } from "../../firebase/api/userService";
import { Doctor, UserType } from "../../interfaces/Client";
import { Chat, ChatCreate } from "../../interfaces/Chat";
import { addAppointmentToChat, createChat, getChatsByDoctorId } from "../../firebase/api/chatService";
import { Appointment } from "../../interfaces/Appointment";
import { collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { Dropdown } from "../../components/forms/Dropdown";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";

const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [selectedDuration, setSelectedDuration] = useState<number>(0);

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const initializeDoctor = async () => {
    const doctor = await getDoctorById(id ?? "");
    setDoctor(doctor);
  };

  const initilizeChats = async () => {
    const chats = await getChatsByDoctorId(doctor?.id ?? "");
    setChats(chats);
  };

  useEffect(() => {
    initializeDoctor();

    
  const gsReference = ref(
    storage,
    `gs://psico-vivir.appspot.com/imagesUsers/${id}`
  );

const defaultGsReference = ref(
storage,
"gs://psico-vivir.appspot.com/imagesUsers/default.png"
);

const img = document.getElementById("profile-pic");

getMetadata(gsReference)
.then(() => {

getDownloadURL(gsReference).then((url) => {
  img?.setAttribute("src", url);
});
})
.catch((error) => {
console.log(error);

getDownloadURL(defaultGsReference).then((url) => {
  img?.setAttribute("src", url);
});
}); 
    
    const collectionRef = collection(db, "chats");

    switch (user?.type) {
      case UserType.DOCTOR:
        const doctorQuery = query(
          collectionRef,
          where("doctorId", "==", user!.id),
          orderBy("updatedAt", "desc")
        );

        const doctorUnsub = onSnapshot(doctorQuery, (querySnapshot) => {
          setChats(
            querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Chat)
            )
          );
        });

        return () => doctorUnsub();

      case UserType.CLIENT:
        const clientQuery = query(
          collectionRef,
          where("clientId", "==", user!.id),
          orderBy("updatedAt", "desc")
        );

        const clientUnsub = onSnapshot(clientQuery, (querySnapshot) => {
          setChats(
            querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Chat)
            )
          );
        });

        return () => clientUnsub();
    }

  }, []);

  function validateValues(): boolean {
    if (selectedDuration === 0) {
      toast.error("Selecciona una duración");
      return false;
    }

    if (title.length <= 5) {
      toast.error("El título necesita al menos 5 caracteres");
      return false;
    }

    if (description.length <= 20) {
      toast.error("La descripción necesita al menos 20 caracteres");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateValues()) return;

    try {
      const chatClientDoctor = checkIfChatExists();
      const newAppointment: Appointment = {
        title: title,
        description: description,
        date: Timestamp.fromDate(startDate),
        duration: selectedDuration,
        paid: false,
        clientCanTalk: false,
        messages: [],
      };

      if (chatClientDoctor) {
        if (chatClientDoctor.lastAppointmentActive) {
          toast.error("Ya tienes una cita activa con este doctor");
          return;
        }

        addAppointmentToChat(chatClientDoctor, newAppointment);
        toast.success("Cita creada con éxito");
        return;
      }

      
      const chat: ChatCreate = {
        clientId: user?.id ?? "",
        doctorId: doctor?.id ?? "",
        lastAppointmentActive: true,
        appointments: [newAppointment],
      };

      await createChat(chat);
      toast.success("Cita creada con éxito");
    } catch (error) {
      toast.error("Error al crear la cita")
    }

    console.log(startDate.toISOString());
  };

  function checkIfChatExists(): Chat | null {
    const chat = chats.find((chat) => chat.clientId === user?.id);
    return chat ?? null;
  }

  return (
    <div className="px-14 py-7 bg-quaternary-normal">
      <div
        className="backdrop-blur-lg bg-white drop-shadow-lg
          p-6 rounded-2xl justify-center"
      >
        <h1 className="text-4xl font-bold text-center">Agenda una cita</h1>

        <main className="flex flex-col md:flex-row mt-10 justify-between gap-y-6">
          <section className="flex justify-center w-full md:w-1/4 mt-6">
            <div className="w-full">
              <div
                className="border-8 border-primary-normal 
                rounded-full aspect-square w-full max-w-[256px] m-auto overflow-hidden"
              >
                <img src={k} alt="" />
              </div>
            </div>
          </section>

          <section className="md:w-2/5 flex flex-col justify-center   gap-y-4">
            <h1 className="font-bold text-4xl text-center md:text-left">
              Dr. {doctor?.name}
            </h1>

            <div className="w-full max-w-[14rem] self-center md:self-start">
              <Dropdown
                title="Selecciona la duración"
                options={[
                  {
                    value: "1 hora",
                    label: "1 hora",
                    onClick: () => setSelectedDuration(1),
                  },
                  {
                    value: "2 horas",
                    label: "2 horas",
                    onClick: () => setSelectedDuration(2),
                  },
                  {
                    value: "3 horas",
                    label: "3 horas",
                    onClick: () => setSelectedDuration(3),
                  },
                ]}
              />
            </div>

            <div className="flex flex-col self-center md:self-start">
              <label htmlFor="date" className="font-medium text-2xl">
                Selecciona la fecha:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                showTimeSelect
                dateFormat="Pp"
                className="border-2 border-secondary-normal w-full max-w-[12rem]"
              />
            </div>

            <div className="flex flex-col self-center md:self-start">
              <label htmlFor="biography" className="font-medium text-2xl">
                Titulo de la cita
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="w-10/12 max-w-[300px] h-12 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold "
                placeholder="Título"
              />
            </div>

            <div className="flex flex-col self-center md:self-start">
              <label htmlFor="biography" className="font-medium text-2xl">
                Descripció n de la cita:
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="biography"
                className="w-10/12 h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold max-w-sm resize-y"
                placeholder="Aqui la descripción de la cita"
              />
            </div>

            <div className="hidden md:flex justify-center mt-12">
              <button
                onClick={handleSubmit}
                className="bg-secondary-normal h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold hidden md:block hover:scale-105"
              >
                Agendar cita
              </button>
            </div>
          </section>

          <section className="flex flex-col items-center md:items-baseline">
            <div
              className="backdrop-blur-lg bg-quaternary-normal drop-shadow-lg w-full
          py-6 lg:px-6 px-3 rounded-2xl justify-center"
            >
              <h1 className="text-xl font-bold text-center">Contactos</h1>

              <div className="flex flex-col">
                <h1 className="font-bold">Email</h1>
                <h1 className="mt-1">{doctor?.email}</h1>
              </div>

              <div className="flex flex-col mt-5">
                <h1 className="font-bold">Número de teléfono</h1>
                <h1 className="mt-1">{doctor?.phone}</h1>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-secondary-normal my-3 h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold md:hidden"
              >
                Agendar cita
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppointmentBooking;
