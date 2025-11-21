// Constantes globales
export const ESTADOS = [
  { key: "libre", label: "Libre" },
  { key: "ocupado", label: "Ocupado" },
  { key: "reservado", label: "Reservado" },
];

export const ZONAS = [
  { key: "todos", label: "Todas las zonas" },
  { key: "salon", label: "Salón" },
  { key: "terraza", label: "Terraza" },
  { key: "barra", label: "Barra" },
];

export const HORAS = [
  "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
  "20:00","20:30","21:00","21:30","22:00","22:30" 
];

export const mesasIniciales = Array.from({ length: 16 }).map((_, i) => {
  const id = i + 1;
  const zonaIdx = i % 3;
  const zona = zonaIdx === 0 ? "salon" : zonaIdx === 1 ? "terraza" : "barra";
  const fila = String.fromCharCode(65 + Math.floor(i / 4));
  const col = (i % 4) + 1;
  return {
    id,
    estado: i % 3 === 0 ? "libre" : i % 3 === 1 ? "ocupado" : "reservado",
    personas: i % 5,
    capacidad: i % 4 === 0 ? 6 : i % 4 === 1 ? 4 : i % 4 === 2 ? 2 : 8,
    zona,
    ubicacion: `${zona.toUpperCase()} ${fila}${col}`,
    clienteId: null,
  };
});

export const RESERVAS_EJEMPLO = {
  "13:00": new Set([2, 5, 7]),
  "19:30": new Set([1, 3, 4, 10]),
  "20:00": new Set([6, 12, 14]),
};

export const clientesIniciales = [
  { id: 1, nombre: "Gonzalo", email: "gonzalowowo@elfernandonohizonada.cl", telefono: "55774488995", run: "19736376-2", mesa: null },
];
