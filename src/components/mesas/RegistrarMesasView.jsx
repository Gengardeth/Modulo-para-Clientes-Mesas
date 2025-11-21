import { useState } from "react";
import { estadoClase, statusDot, Campo } from "../../utils/helpers.jsx";

export default function RegistrarMesasView({ mesas, setMesas }){
  const [form, setForm] = useState({ numero:"", ubicacion:"", capacidad:"" });
  const [errores, setErrores] = useState({});
  const [okMsg, setOkMsg] = useState("");

  const validar = () => {
    const e = {};
    const numero = Number(form.numero);
    const capacidad = Number(form.capacidad);
    if(!form.numero || isNaN(numero) || numero<=0) e.numero = "Ingresa un número válido (>0).";
    if(!form.ubicacion.trim()) e.ubicacion = "La ubicación es obligatoria.";
    if(!form.capacidad || isNaN(capacidad) || capacidad<=0) e.capacidad = "Ingresa una capacidad válida (>0).";
    if(!e.numero && mesas.some(m=>m.id === numero)) e.numero = "Ya existe una mesa con ese número.";
    setErrores(e);
    return Object.keys(e).length===0;
  };

  const guardar = () => {
    if(!validar()) return;
    const numero = Number(form.numero);
    const capacidad = Number(form.capacidad);
    const nuevaMesa = {
      id: numero,
      ubicacion: form.ubicacion,
      capacidad,
      estado: "libre",
      personas: 0,
      clienteId: null,
      zona: "salon"
    };
    setMesas(prev=>{
      const lista = [...prev, nuevaMesa];
      return lista.sort((a,b)=>a.id-b.id);
    });
    setOkMsg(`Mesa #${numero} guardada correctamente.`);
    setForm({ numero:"", ubicacion:"", capacidad:"" });
    setErrores({});
    setTimeout(()=>setOkMsg(""), 3000);
  };

  return (
    <section className="space-y-6">
      <div className="bg-white p-7 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Registrar Mesas</h2>

        {okMsg && (
          <div className="mb-6 rounded-lg border border-green-300 bg-green-50 text-green-800 px-4 py-3 text-sm font-medium animate-in slide-in-from-top">
            ✓ {okMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Campo label="Número de mesa" error={errores.numero}>
            <input value={form.numero} onChange={(e)=>setForm({...form, numero:e.target.value})} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" placeholder="Ej: 21" />
          </Campo>
          <Campo label="Ubicación" error={errores.ubicacion}>
            <input value={form.ubicacion} onChange={(e)=>setForm({...form, ubicacion:e.target.value})} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" placeholder="Ej: SALÓN B3" />
          </Campo>
          <Campo label="Capacidad" error={errores.capacidad}>
            <input value={form.capacidad} onChange={(e)=>setForm({...form, capacidad:e.target.value})} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" placeholder="Ej: 4" />
          </Campo>
        </div>

        <div className="flex gap-3">
          <button onClick={guardar} className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition text-sm">Guardar mesa</button>
          <button onClick={()=>{ setForm({ numero:"", ubicacion:"", capacidad:"" }); setErrores({}); }} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-sm bg-white">Limpiar</button>
        </div>
      </div>

      <div className="bg-white p-7 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mesas registradas</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-semibold text-gray-900 text-sm">Número</th>
                <th className="p-3 text-left font-semibold text-gray-900 text-sm">Ubicación</th>
                <th className="p-3 text-left font-semibold text-gray-900 text-sm">Capacidad</th>
                <th className="p-3 text-left font-semibold text-gray-900 text-sm">Estado</th>
              </tr>
            </thead>
            <tbody>
              {mesas.map(m=>(
                <tr key={m.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-gray-900">#{m.id}</td>
                  <td className="p-3 text-sm text-gray-600">{m.ubicacion}</td>
                  <td className="p-3 text-sm text-gray-600">{m.capacidad}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1.5 ${estadoClase(m.estado)}`}>
                      {statusDot(m.estado)} {m.estado.charAt(0).toUpperCase()+m.estado.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
              {mesas.length===0 && (
                <tr><td className="p-3 text-sm text-gray-500" colSpan={4}>No hay mesas registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-600 mt-3 font-medium">Las mesas nuevas inician como "Libre".</div>
      </div>
    </section>
  );
}
