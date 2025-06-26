import React from "react";
import logoEmissor from "/assets/images/logo.png";

const Logo = () => {
  return (
    <a href="#">
      <img src={logoEmissor} alt="Logo Emissor" className="h-25 w-30" />
    </a>
  );
};

export default Logo;
