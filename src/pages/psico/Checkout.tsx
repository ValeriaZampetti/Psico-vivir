import React from 'react';
import paypalLogo from "../../assets/images/logo-Paypal.png";

function Checkout() {
    return (
        <div className="flex flex-col items-center mb-10">
            <div className="h-16 flex items-center justify-center font-bold text-4xl mb-4">Checkout</div>
            <div className="w-5/6 h-auto border-gray-300 border-2 rounded-xl shadow-2xl max-w-sm">
                <div className="h-8 flex items-center justify-center font-medium text-2xl mb-4 mt-4">Información de la cita</div>
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
                    <button className="bg-yellow-400 h-12 w-60 rounded-full hover:scale-105">
                        <div className="flex justify-center gap-2">
                            <img src={paypalLogo} alt="paypal-logo" className="h-6" />
                            <div className="font-bold">Checkout</div>
                        </div>
                    </button>
                    <button className="bg-gray-800 h-12 w-60 rounded-full mt-3 mb-7 hover:scale-105">
                        <div className="flex justify-center gap-2">
                            <img src="../../src/assets/icons/paypal.svg" alt="paypal-logo" className="h-6" />
                            <div className="font-bold text-white">Pay Later</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Checkout;