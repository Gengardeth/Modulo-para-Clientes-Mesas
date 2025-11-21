import { useState } from "react";
import ModalEditarCliente from "./ModalEditarCliente";
import AsignarDropdown from "./AsignarDropdown";

export default function ClientesView({ clientes, setClientes, mesas, onAsignar }){
  const [busqueda, setBusqueda] = useState("");
  const [nuevo, setNuevo] = useState({ nombre:"", email:"", telefono:"", run:"" });
  const [editando, setEditando] = useState(null);

  const filtrados = clientes.filter(c=> c.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const agregar = () => {
    if(!nuevo.nombre.trim()) return;
    setClientes(prev => [...prev, { id: Date.now(), ...nuevo, mesa:null }]);
    setNuevo({ nombre:"", email:"", telefono:"", run:"" });
  };
  const eliminar = (id) => setClientes(prev => prev.filter(c=>c.id!==id));

  const guardarEdicion = (datos) => {
    setClientes(prev => prev.map(c => c.id === datos.id ? { ...c, nombre: datos.nombre, email: datos.email, telefono: datos.telefono, run: datos.run } : c));
    setEditando(null);
  };

  return (
    <section className="space-y-8">
      <div className="bg-white p-7 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Clientes</h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Total: {clientes.length} cliente(s)</p>
          </div>
        </div>
        
        <input type="text" placeholder="Buscar cliente..." value={busqueda} onChange={(e)=>setBusqueda(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left font-semibold text-gray-900">Nombre</th>
                <th className="p-3 text-left font-semibold text-gray-900">Email</th>
                <th className="p-3 text-left font-semibold text-gray-900">Teléfono</th>
                <th className="p-3 text-left font-semibold text-gray-900">RUN</th>
                <th className="p-3 text-left font-semibold text-gray-900">Mesa</th>
                <th className="p-3 text-center font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c=>{
                const mesa = c.mesa ? mesas.find(m=>m.id===c.mesa) : null;
                return (
                  <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-3 font-medium text-gray-900">{c.nombre}</td>
                    <td className="p-3 text-gray-600">{c.email}</td>
                    <td className="p-3 text-gray-600">{c.telefono}</td>
                    <td className="p-3 text-gray-600">{c.run}</td>
                    <td className="p-3">{mesa ? <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-lg text-xs font-medium">Mesa {mesa.id}</span> : <span className="text-gray-400 font-medium">—</span>}</td>
                    <td className="p-3 flex justify-center gap-2">
                      {mesa ? (
                        <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 border border-green-300 text-xs font-medium">✓ Asignado</span>
                      ) : (
                        <AsignarDropdown mesas={mesas} onAsignar={(mesaId)=>onAsignar(c.id, mesaId)} />
                      )}
                      <button onClick={()=>setEditando(c)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs font-semibold">Editar</button>
                      <button onClick={()=>eliminar(c.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-xs font-semibold">Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-7 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Agregar Nuevo Cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Nombre" value={nuevo.nombre} onChange={(e)=>setNuevo({...nuevo, nombre:e.target.value})} className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" />
          <input type="email" placeholder="Email" value={nuevo.email} onChange={(e)=>setNuevo({...nuevo, email:e.target.value})} className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" />
          <input type="text" placeholder="Teléfono" value={nuevo.telefono} onChange={(e)=>setNuevo({...nuevo, telefono:e.target.value})} className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" />
          <input type="text" placeholder="RUN (12345678-9)" value={nuevo.run} onChange={(e)=>setNuevo({...nuevo, run:e.target.value})} className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition bg-white" />
        </div>
        <button onClick={agregar} className="w-full bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 font-semibold text-sm transition">+ Agregar Nuevo Cliente</button>
      </div>

      {editando && (
        <ModalEditarCliente
          cliente={editando}
          onClose={()=>setEditando(null)}
          onSave={guardarEdicion}
        />
      )}
    </section>
  );
}
