import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "./App.css";

const ScrollAnimation = () => {
  useEffect(() => {
    ScrollReveal().reveal(".title", { duration: 1000, origin: "top", distance: "50px" });
    ScrollReveal().reveal(".content", { duration: 1500, origin: "bottom", distance: "50px" });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Bem-vindo ao Gerenciamento de FIIs</h1>
      <p className="content">
        Gerencie seus fundos de forma eficiente com o melhor visual estilo Netflix.
      </p>
    </div>
  );
};

export default ScrollAnimation;