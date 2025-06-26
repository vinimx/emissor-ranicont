import React from "react";
import logoEmissor from "/assets/images/logo.png";

const Logo = () => {
  return (
    <a href="#">
      <img src={logoEmissor} alt="Logo Emissor" className="h-10 w-8" />
    </a>
  );
};

export default Logo;
