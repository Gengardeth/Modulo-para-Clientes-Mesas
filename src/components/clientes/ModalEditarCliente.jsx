import { useState } from "react";
import { Campo } from "../../utils/helpers.jsx";

export default function ModalEditarCliente({ cliente, onClose, onSave }){
  const [form, setForm] = useState({
    nombre: cliente.nombre || "",
    email: cliente.email || "",
    telefono: cliente.telefono || "",
    run: cliente.run || ""
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const e = {};
    if(!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if(form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido.";
    if(form.telefono && !/^[0-9+\-\s()]{6,}$/.test(form.telefono)) e.telefono = "Teléfono inválido.";
    if(form.run && !/^[0-9]{6,8}-[0-9kK]$/.test(form.run)) e.run = "RUN con formato inválido (ej: 12345678-9).";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardar = () => {
    if(!validar()) return;
    onSave({ id: cliente.id, ...form });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50" role="dialog" aria-modal>
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-gray-200 animate-in fade-in zoom-in-95">
        <div className="p-7 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Editar cliente</h2>
          <button onClick={onClose} className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">✕</button>
        </div>
        <div className="p-7 space-y-4">
          <Campo label="Nombre" error={errores.nombre}>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" value={form.nombre} onChange={(e)=>setForm({...form, nombre:e.target.value})} />
          </Campo>
          <Campo label="Email" error={errores.email}>
            <input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          </Campo>
          <Campo label="Teléfono" error={errores.telefono}>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" value={form.telefono} onChange={(e)=>setForm({...form, telefono:e.target.value})} />
          </Campo>
          <Campo label="RUN" error={errores.run}>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" value={form.run} onChange={(e)=>setForm({...form, run:e.target.value})} placeholder="12345678-9" />
          </Campo>
          <div className="text-xs text-blue-700 bg-blue-50 border border-blue-200 p-3 rounded-lg font-medium">
            La edición no cambia mesa asignada ni el ID del cliente.
          </div>
        </div>
        <div className="p-7 border-t border-gray-200 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-sm bg-white">Cancelar</button>
          <button onClick={guardar} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-sm">Guardar</button>
        </div>
      </div>
    </div>
  );
}
