import { useState } from "react";
import ModalEditarCliente from "./ModalEditarCliente";
import AsignarDropdown from "./AsignarDropdown";
import { Card, Button, Input, Badge } from "../ui";

export default function ClientesView({
  clientes,
  setClientes,
  mesas,
  onAsignar,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [nuevo, setNuevo] = useState({
    nombre: "",
    email: "",
    telefono: "",
    run: "",
  });
  const [editando, setEditando] = useState(null);

  const filtrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregar = () => {
    if (!nuevo.nombre.trim()) return;
    setClientes((prev) => [...prev, { id: Date.now(), ...nuevo, mesa: null }]);
    setNuevo({ nombre: "", email: "", telefono: "", run: "" });
  };

  const eliminar = (id) =>
    setClientes((prev) => prev.filter((c) => c.id !== id));

  const guardarEdicion = (datos) => {
    setClientes((prev) =>
      prev.map((c) =>
        c.id === datos.id
          ? {
              ...c,
              nombre: datos.nombre,
              email: datos.email,
              telefono: datos.telefono,
              run: datos.run,
            }
          : c
      )
    );
    setEditando(null);
  };

  return (
    <section className="space-y-8">
      {/* Lista de Clientes */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Clientes
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Total: {clientes.length} cliente(s)
            </p>
          </div>
        </div>

        <Input
          type="text"
          placeholder="Buscar cliente por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          containerClass="mb-6"
        />

        {filtrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">
              {busqueda ? "No se encontraron clientes" : "No hay clientes"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-left font-semibold text-gray-900">
                    Nombre
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-900">
                    Teléfono
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-900">
                    RUN
                  </th>
                  <th className="p-4 text-left font-semibold text-gray-900">
                    Mesa
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c) => {
                  const mesa = c.mesa ? mesas.find((m) => m.id === c.mesa) : null;
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-900">
                        {c.nombre}
                      </td>
                      <td className="p-4 text-gray-600">{c.email || "—"}</td>
                      <td className="p-4 text-gray-600">{c.telefono || "—"}</td>
                      <td className="p-4 text-gray-600">{c.run || "—"}</td>
                      <td className="p-4">
                        {mesa ? (
                          <Badge label={`Mesa ${mesa.id}`} variant="warning" />
                        ) : (
                          <span className="text-gray-400 font-medium">—</span>
                        )}
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        {mesa ? (
                          <Badge
                            label="✓ Asignado"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <AsignarDropdown
                            mesas={mesas}
                            onAsignar={(mesaId) => onAsignar(c.id, mesaId)}
                          />
                        )}
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setEditando(c)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminar(c.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Agregar Nuevo Cliente */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8">
          Agregar Nuevo Cliente
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Input
            type="text"
            placeholder="Nombre completo"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            label="Nombre"
          />
          <Input
            type="email"
            placeholder="correo@ejemplo.com"
            value={nuevo.email}
            onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
            label="Email"
          />
          <Input
            type="text"
            placeholder="+56 9 1234 5678"
            value={nuevo.telefono}
            onChange={(e) =>
              setNuevo({ ...nuevo, telefono: e.target.value })
            }
            label="Teléfono"
          />
          <Input
            type="text"
            placeholder="12345678-9"
            value={nuevo.run}
            onChange={(e) => setNuevo({ ...nuevo, run: e.target.value })}
            label="RUN"
          />
        </div>

        <Button
          onClick={agregar}
          variant="primary"
          size="lg"
          className="w-full"
        >
          + Agregar Nuevo Cliente
        </Button>
      </Card>

      {/* Modal Editar */}
      {editando && (
        <ModalEditarCliente
          cliente={editando}
          onClose={() => setEditando(null)}
          onSave={guardarEdicion}
        />
      )}
    </section>
  );
}
