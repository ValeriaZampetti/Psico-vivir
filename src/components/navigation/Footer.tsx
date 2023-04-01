import React, { Component } from "react";

export const Footer = () => (
    <footer className="bg-secondary-normal flex flex-wrap text-lg justify-between border-t-[1px] p-4 border-[black] w-full gap-8">
        <ul className="flex flex-col gap-4 w-56">
            <li>
                <h2 className="font-bold">Atención al cliente</h2>
                <p>citas@psicovivir.com</p>
            </li>

            <li>
                <h2 className="font-bold">Información de psicologos</h2>
                <p>psicologo@psicovivir.com</p>
            </li>
        </ul>

        <ul className="flex flex-col gap-4 w-56">
            <li>
                <h2 className="font-bold">Atención al cliente</h2>
                <p>citas@psicovivir.com</p>
            </li>

            <li>
                <h2 className="font-bold">Información de psicologos</h2>
                <p>psicologo@psicovivir.com</p>
            </li>
        </ul>

        <ul className="flex flex-col w-56 font-bold gap-1">
            <li>
                <a href="#">Home</a>
            </li>

            <li>
                <a href="#">Sobre Nosotros</a>
            </li>

            <li>
                <a href="#">Servicios</a>
            </li>

            <li>
                <a href="#">Opiniones</a>
            </li>
        </ul>
    </footer>
);
