import React from "react";

// Funciones utilidad
export const estadoClase = (estado) => {
  switch (estado) {
    case "libre": return "bg-green-100 text-green-800 border border-green-300 rounded-lg px-3 py-1.5 text-sm font-medium";
    case "ocupado": return "bg-red-100 text-red-800 border border-red-300 rounded-lg px-3 py-1.5 text-sm font-medium";
    case "reservado": return "bg-amber-100 text-amber-900 border border-amber-300 rounded-lg px-3 py-1.5 text-sm font-medium";
    default: return "bg-gray-100 text-gray-800 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium";
  }
};

export const statusDot = (estado) => {
  const color = estado === "libre" ? "bg-green-400" : estado === "ocupado" ? "bg-red-400" : "bg-amber-400";
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${color} mr-2`} />;
};

export const Campo = ({ label, error, children }) => {
  return (
    <div>
      <label className="text-xs font-semibold block mb-2 text-gray-700">{label}</label>
      {children}
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
};

