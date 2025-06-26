import React from "react";
import logoEmissor from "public/assets/images/logo.png";

const Logo = () => {
  return (
    <a>
      <img src={logoEmissor} alt="Logo Emissor" className="h-8 w-8" />
    </a>
  );
};
