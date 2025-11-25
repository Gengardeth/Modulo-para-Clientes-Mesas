import { ESTADOS } from "../../utils/constants";
import { estadoClase, statusDot } from "../../utils/helpers.jsx";
import { Card, Button, Select, Badge } from "../ui";

export default function MesaCard({
  mesa,
  cliente,
  onAbrir,
  onCambiarEstado,
  onAjustarPersonas,
  onDesasignar,
  onAsignar,
  clientesDisponibles,
  reserva,
  onAjustarCapacidad,
}) {
  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'libre':
        return '🟢';
      case 'ocupado':
        return '🔴';
      case 'reservado':
        return '🟡';
      default:
        return '⚪';
    }
  };

  return (
    <Card className="p-6 h-full flex flex-col bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300">
      {/* Header con Estado */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-gray-100">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{getEstadoIcon(mesa.estado)}</span>
            <h3 className="text-2xl font-black text-gray-900">Mesa #{mesa.id}</h3>
          </div>
          <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">{mesa.ubicacion}</p>
        </div>
        <Badge
          label={mesa.estado.toUpperCase()}
          variant={
            mesa.estado === "libre"
              ? "success"
              : mesa.estado === "ocupado"
              ? "danger"
              : "warning"
          }
          size="md"
        />
      </div>

      {/* Info Grid - Mejorado */}
      <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="text-center">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Capacidad</p>
          <p className="text-2xl font-black text-blue-600">{mesa.capacidad}</p>
          <p className="text-xs text-gray-500 mt-1">pax</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Personas</p>
          <p className="text-2xl font-black text-indigo-600">{mesa.personas}</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full transition-all duration-300" 
              style={{ width: `${(mesa.personas / mesa.capacidad) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="col-span-2 text-center bg-white rounded-lg p-3 border border-blue-100">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Cliente</p>
          <p className="text-sm font-bold text-gray-900">
            {cliente ? cliente.nombre : "Sin asignar"}
          </p>
        </div>
        {reserva && (
          <div className="col-span-2 text-center bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">⏰ Reserva</p>
            <p className="text-sm font-bold text-yellow-900">
              {reserva.clienteNombre} tiene una reserva a las {reserva.hora}
            </p>
          </div>
        )}
      </div>

      {/* Controls - Mejorados */}
      <div className="space-y-4 flex-1">
        {/* Ajustar Personas */}
        <div>
          <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">
            Ajustar Personas
          </p>
          <div className="inline-flex rounded-xl border-2 border-gray-200 overflow-hidden bg-white w-full shadow-md hover:border-blue-300 transition">
            <button
              onClick={() => onAjustarPersonas(mesa.id, -1)}
              className="flex-1 px-3 py-3 hover:bg-gray-100 transition font-bold text-xl text-gray-700 active:bg-gray-200"
            >
              −
            </button>
            <div className="flex-1 px-3 py-3 border-l-2 border-r-2 border-gray-200 text-xl font-black text-blue-600 flex items-center justify-center">
              {mesa.personas}
            </div>
            <button
              onClick={() => onAjustarPersonas(mesa.id, 1)}
              className="flex-1 px-3 py-3 hover:bg-gray-100 transition font-bold text-xl text-gray-700 active:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Ajustar Capacidad */}
        {onAjustarCapacidad && (
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-3">
              Ajustar Capacidad
            </p>
            <div className="inline-flex rounded-xl border-2 border-gray-200 overflow-hidden bg-white w-full shadow-md hover:border-indigo-300 transition">
              <button
                onClick={() => onAjustarCapacidad(mesa.id, -1)}
                className="flex-1 px-3 py-3 hover:bg-gray-100 transition font-bold text-xl text-gray-700 active:bg-gray-200"
              >
                −
              </button>
              <div className="flex-1 px-3 py-3 border-l-2 border-r-2 border-gray-200 text-xl font-black text-indigo-600 flex items-center justify-center">
                {mesa.capacidad}
              </div>
              <button
                onClick={() => onAjustarCapacidad(mesa.id, 1)}
                className="flex-1 px-3 py-3 hover:bg-gray-100 transition font-bold text-xl text-gray-700 active:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Estado */}
        <Select
          label="Estado"
          value={mesa.estado}
          onChange={(e) => onCambiarEstado(mesa.id, e.target.value)}
          options={ESTADOS.map((e) => ({
            label: e.label,
            value: e.key,
          }))}
        />

        {/* Cliente Assignment */}
        {cliente ? (
          <div className="pt-4 border-t-2 border-gray-100">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200">
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">✓ Asignado a</p>
              <p className="text-lg font-bold text-green-900">{cliente.nombre}</p>
            </div>
          </div>
        ) : (
          <Select
            label="Asignar Cliente"
            defaultValue=""
            onChange={(e) => e.target.value && onAsignar(Number(e.target.value))}
            options={[
              { label: "Seleccionar cliente...", value: "" },
              ...clientesDisponibles.map((c) => ({
                label: c.nombre,
                value: c.id,
              })),
            ]}
          />
        )}
      </div>

      {/* Actions - Simétricos y destacados */}
      <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t-2 border-gray-100">
        {cliente ? (
          <Button
            variant="ghost"
            onClick={onDesasignar}
            className="text-gray-600 border-2 border-gray-300 hover:border-red-300 hover:text-red-600 font-bold"
          >
            Desasignar
          </Button>
        ) : (
          <div />
        )}
        <Button 
          variant="primary" 
          onClick={onAbrir}
          className="font-bold shadow-lg hover:shadow-xl"
        >
          ✏️ Editar
        </Button>
      </div>
    </Card>
  );
}
