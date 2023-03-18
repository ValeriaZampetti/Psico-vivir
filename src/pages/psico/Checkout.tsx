import React from "react";
import paypalLogo from "../../assets/images/logo-Paypal.png";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mb-10 h-">
      <div className="h-16 flex items-center justify-center font-bold text-4xl mb-4">
        Checkout
      </div>
      <div className="w-5/6 h-auto border-gray-300 border-2 rounded-xl shadow-2xl max-w-sm">
        <div className="h-8 flex items-center justify-center font-medium text-2xl mb-4 mt-4">
          Información de la cita
        </div>
        <div className="h-6 w-full flex items-center font-medium text-md px-4 smin1:px-9">
          <span className="font-bold">Doctor:</span>&nbsp; Dra. Soprano
        </div>
        <div className="h-6 w-full flex items-center font-medium text-md px-4 smin1:px-9">
          <span className="font-bold">Hora de incio:</span>&nbsp; 4:30pm
        </div>
        <div className="h-6 w-full flex items-center font-medium text-md px-4 smin1:px-9">
          <span className="font-bold">Hora de cierre:</span>&nbsp; 6:30pm
        </div>
        <div className="h-6 w-full flex items-center font-medium text-md px-4 smin1:px-9">
          <span className="font-bold">Tiempo de consulta:</span>&nbsp; 2 horas
        </div>
        <div className="h-6 w-full flex items-center justify-center font-medium text-2xl px-2 mt-4">
          <span className="font-bold">Total:</span>&nbsp; $90.00
        </div>
        <div className="flex flex-col items-center pt-7 justify-center text-center content-center center">
          <div className="paypal-button_container pb-7 w-4/5">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AQ4F8JZF3wIeaJtUxtimxHhfaVFrgivCZOnffwyp-bfQfqSM_134_d7OO9nUiPwZ_GHZxXg321g4kUWE",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "horizontal",
                  shape: "pill",
                  label: "checkout",
                  height: 50,
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "90.0",
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data: any, actions: any) => {
                  return actions.order?.capture().then(function (details: any) {
                    alert(
                      "Transaction completed by " +
                        details.payer.name?.given_name
                    );
                    navigate("/landing");
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
