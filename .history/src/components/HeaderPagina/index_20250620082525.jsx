import React from "react";

export default function CabecalhoPagina({ titulo, subtitulo, acao, children }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-wide">{titulo}</h2>
        {subtitulo && (
          <p className="text-lg" style={{ color: "var(--suave-texto)" }}>
            {subtitulo}
          </p>
        )}
        {children}
      </div>
      {acao && <div>{acao}</div>}
    </div>
  );
}
