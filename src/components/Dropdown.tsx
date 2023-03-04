import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../docs/assets/Logotipo.png";

export const Dropdown = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="relative inline-block text-left"></div>
        </div>
    );
};
