import React from "react";
import NotFound from "../assets/images/404.jpg";

interface Props{
  errorMessage?: string;
}

function Error404(props: Props) {
  return (
    <div className="p-8 flex justify-center items-center flex-col">
      <h1 className="text-center font-bold text-red-500 text-3xl">Error 404</h1>
      <h2 className="text-center font-bold text-2xl">
        {props.errorMessage || "Página no encontrada"}
      </h2>

      <img className="w-[60rem]" src={NotFound} alt="404" />

      <div className="text-sm self-start ">
        <a
          className="text-blue-500"
          href="https://www.freepik.es/vector-gratis/error-404-ilustracion-concepto-portales_20602754.htm#query=error%20404&position=6&from_view=keyword&track=ais"
        >
          Imagen de storyset
        </a>{" "}
        en Freepik
      </div>
    </div>
  );
}

export default Error404;
