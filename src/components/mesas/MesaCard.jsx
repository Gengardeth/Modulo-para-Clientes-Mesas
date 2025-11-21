import { ESTADOS } from "../../utils/constants";
import { estadoClase, statusDot } from "../../utils/helpers.jsx";

export default function MesaCard({ mesa, cliente, onAbrir, onCambiarEstado, onAjustarPersonas, onDesasignar, onAsignar, clientesDisponibles }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-xl font-semibold text-gray-900">Mesa #{mesa.id}</div>
          <div className="text-sm text-gray-500 font-medium">{mesa.ubicacion}</div>
        </div>
        <span className={`inline-flex items-center gap-1.5 ${estadoClase(mesa.estado)}`}>
          {statusDot(mesa.estado)} {mesa.estado.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 font-medium">Capacidad</span>
          <span className="font-semibold text-gray-900">{mesa.capacidad} pax</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 font-medium">Personas</span>
          <span className="font-semibold text-gray-900">{mesa.personas}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 font-medium">Cliente</span>
          <span className="font-semibold text-gray-900">{cliente ? cliente.nombre : "—"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden bg-white">
          <button onClick={() => onAjustarPersonas(mesa.id, -1)} className="px-3 py-2 hover:bg-gray-50 transition font-medium text-gray-700">−</button>
          <div className="px-3 py-2 border-l border-r border-gray-300 text-base font-semibold text-gray-900 min-w-14 text-center">{mesa.personas}</div>
          <button onClick={() => onAjustarPersonas(mesa.id, 1)} className="px-3 py-2 hover:bg-gray-50 transition font-medium text-gray-700">+</button>
        </div>
        <select value={mesa.estado} onChange={(e) => onCambiarEstado(mesa.id, e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white">
          {ESTADOS.map((e) => (<option key={e.key} value={e.key}>{e.label}</option>))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {cliente ? (
          <button onClick={onDesasignar} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition bg-white">Quitar</button>
        ) : (
          <select defaultValue="" onChange={(e)=> e.target.value && onAsignar(Number(e.target.value))} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium w-full outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white">
            <option value="" disabled>Asignar…</option>
            {clientesDisponibles.length===0 ? <option value="" disabled>Sin clientes</option> : clientesDisponibles.map(c=> (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        )}
        <button onClick={onAbrir} className="rounded-lg border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition">Editar</button>
      </div>
    </div>
  );
}
