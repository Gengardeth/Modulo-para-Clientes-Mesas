import { useMemo, useState } from "react";
import { ESTADOS, ZONAS, HORAS } from "../../utils/constants";
import { statusDot } from "../../utils/helpers.jsx";

export default function DisponibilidadView({ mesas, reservas, clientes, onReservar }){
  const [hora, setHora] = useState("19:00");
  const [zona, setZona] = useState("todos");
  const [personas, setPersonas] = useState(2);
  const [clienteId, setClienteId] = useState("");

  const libres = useMemo(() => {
    const ocupadasPorHora = reservas[hora] || new Set();
    return mesas.filter((m) => {
      const libreAhora = m.estado === "libre" && m.clienteId == null;
      const noReservadaEnHora = !ocupadasPorHora.has(m.id);
      const cumpleZona = zona === "todos" ? true : m.zona === zona;
      const cumpleCapacidad = m.capacidad >= Number(personas || 0);
      return libreAhora && noReservadaEnHora && cumpleZona && cumpleCapacidad;
    });
  }, [mesas, reservas, hora, zona, personas]);

  return (
    <section className="space-y-8">
      <div className="bg-white p-7 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Filtros de Disponibilidad</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">Horario</label>
            <select value={hora} onChange={(e) => setHora(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition text-sm font-medium bg-white">
              {HORAS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">Zona</label>
            <select value={zona} onChange={(e) => setZona(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition text-sm font-medium bg-white">
              {ZONAS.map((z) => <option key={z.key} value={z.key}>{z.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">Personas</label>
            <input type="number" min={1} value={personas} onChange={(e) => setPersonas(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition text-sm font-medium bg-white" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">Cliente</label>
            <select value={clienteId} onChange={(e)=>setClienteId(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition text-sm font-medium bg-white">
              <option value="">Selecciona…</option>
              {clientes.filter(c=>c.mesa==null).map(c=> <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="flex items-end text-sm font-semibold text-gray-700">Solo mesas libres</div>
        </div>
      </div>

      {libres.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-base text-gray-600 font-medium">No hay mesas disponibles con estos filtros</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Mesas Disponibles: {libres.length}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {libres.map((m) => (
              <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div className="text-lg font-semibold text-gray-900">Mesa #{m.id}</div>
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 border border-green-300 rounded-lg px-3 py-1.5 text-xs font-medium">{statusDot("libre")}Libre</span>
                </div>
                <div className="space-y-3 mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Zona</span>
                    <span className="font-semibold text-gray-900">{m.zona.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Ubicación</span>
                    <span className="font-semibold text-gray-900">{m.ubicacion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Capacidad</span>
                    <span className="font-semibold text-gray-900">{m.capacidad} pax</span>
                  </div>
                </div>
                <button disabled={!clienteId} onClick={()=>onReservar(m.id, Number(clienteId))} className={`w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${clienteId?"bg-blue-500 text-white hover:bg-blue-600":"bg-gray-200 text-gray-500 cursor-not-allowed"}`}>Reservar a {hora}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
