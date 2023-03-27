import  k  from "../../assets/mock/pic.jpg"

function ProfileDoctor() {
    return (
            <div className="py-5 md:flex">
                <div className="flex justify-center w-full md:w-1/3">
                    <div className="w-full">
                        <img src={k} alt="" className="border-8 border-primary-normal 
                        rounded-full aspect-square w-full max-w-xs m-auto"/>
                    </div>
                </div>
                <div className="md:w-2/3 md:pr-4">
                    <div className="flex justify-center mt-6 flex-col w-full">
                        <div className="w-full flex flex-col md:justify-between 
                        items-center md:flex-row">
                            <h1 className="font-bold text-4xl">Pedro Pascal</h1>
                            <h1 className="font-bold">2do. mejor</h1>
                        </div>
                        <div className="h-24 bg-yellow-500 w-full">Rating</div>
                    </div>
                    <div>
                        <div className="p-2">
                            <h1 className="font-bold text-3xl">Especialidad</h1>
                            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                        <div className="mt-4 p-2">
                            <h1 className="font-bold text-3xl">Biografia</h1>
                            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center md:flex-row md:gap-8">
                        <h1 className="text-xl p-4 justify-center">Precio de consulta: <span className="font-bold">$10</span></h1>
                        <button className="bg-secondary-normal my-3 mb-6 h-12 w-32 border-4 border-primary-normal rounded-2xl text-primary-normal font-bold md:my-0">¡Reserva ya!</button>
                    </div>
                </div>
            </div>
    )
}

export default ProfileDoctor;