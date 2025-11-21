import { useState } from "react";
import { ESTADOS } from "../../utils/constants";

export default function ModalEditarMesa({ mesa, onClose, onSave }){
  const [estado, setEstado] = useState(mesa.estado);
  const [personas, setPersonas] = useState(mesa.personas);
  
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50" role="dialog" aria-modal>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 animate-in fade-in zoom-in-95">
        <div className="p-7 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Editar Mesa #{mesa.id}</h2>
          <button onClick={onClose} className="px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">✕</button>
        </div>
        <div className="p-7 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Estado</label>
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition text-sm font-medium bg-white" value={estado} onChange={(e)=>setEstado(e.target.value)}>
              {ESTADOS.map((e)=>(<option key={e.key} value={e.key}>{e.label}</option>))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Personas (0–{mesa.capacidad})</label>
            <div className="flex gap-2 items-center">
              <button onClick={()=>setPersonas((p)=>Math.max(0,p-1))} className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition font-medium text-sm">−</button>
              <input type="number" min={0} max={mesa.capacidad} value={personas} onChange={(e)=>setPersonas(Math.max(0, Math.min(mesa.capacidad, Number(e.target.value||0))))} className="flex-1 text-center rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition font-medium text-sm bg-white" />
              <button onClick={()=>setPersonas((p)=>Math.min(mesa.capacidad,p+1))} className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition font-medium text-sm">+</button>
            </div>
          </div>
          <div className="text-xs text-blue-700 bg-blue-50 border border-blue-200 p-3 rounded-lg font-medium">
            La mesa vuelve a "Libre" si no tiene cliente y personas = 0.
          </div>
        </div>
        <div className="p-7 border-t border-gray-200 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-sm bg-white">Cancelar</button>
          <button onClick={()=>onSave({estado, personas})} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-sm">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
