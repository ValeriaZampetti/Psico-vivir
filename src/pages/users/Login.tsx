import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { NavLog } from "../../components/NavLog";
//import { Context } from "../store/appContext";
//import Swal from "sweetalert2";




export const LogIn = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { store, actions } = useContext<any>(Context);
  const navigate = useNavigate();
  const notUser = () => {
    //Swal.fire({
      //icon: "error",
      //title: "Ha ocurrido un error",
      //text: "El usuario no está registrado, por favor registrese antes de iniciar sesión",
    //});
  };

  return (
    <React.Fragment>
      <p className="fs-1 text-center ">{"¿Ya está registrado?"}</p>
      <p className="fw-light text-center">
        Introduzca sus datos para ingresar al portal
      </p>
      <div className="container">
        <div className="row m-3">
          <form>
            <p className="fs-2">
              <strong>{"Email"}</strong>
            </p>
            <input
              type="email"
              name="email"
              className="form-control m-1"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="fs-2">
              <strong>{"Password"}</strong>
            </p>
            <input
              type="password"
              className="form-control m-1"
              name="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-dark m-4"
            onClick={async (e) => {
              //const success = await actions.logIn({
                //email: email,
                //password: password,
              //});
              //if (success) {
                //navigate("/segurosBonpland");
                //return;
              //}
              //notUser();
            }}
          >
            {" "}
            {"Ingresar"}{" "}
          </button>
          <p className="fs-1 text-center">{"¿Desea registrarse?"}</p>
          <p className="fw-light text-center">
            El proceso es rápido y sencillo. Podrá ver sus pólizas y registrar
            sus pagos.
          </p>
          <button
            className="btn btn-dark me-4 btn-lg m-4"
            onClick={(e) => {
              navigate("/sign-up");
            }}
          >
            {"Quiero registrarme"}
          </button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default LogIn