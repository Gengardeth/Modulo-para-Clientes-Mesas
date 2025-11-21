export default function AsignarDropdown({ mesas, onAsignar }){
  const libres = mesas.filter(m=> m.estado === "libre" && m.clienteId==null);
  return (
    <select defaultValue="" onChange={(e)=> e.target.value && onAsignar(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-1 text-xs font-semibold bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition">
      <option value="" disabled>Asignar…</option>
      {libres.length===0 ? <option value="" disabled>No hay mesas libres</option> : libres.map(m=> (
        <option key={m.id} value={m.id}>{`Mesa ${m.id} (${m.zona})`}</option>
      ))}
    </select>
  );
}
