import { useState } from "react";
import { Modal, Button, Input } from "../ui";

export default function ModalEditarCliente({ cliente, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: cliente.nombre || "",
    email: cliente.email || "",
    telefono: cliente.telefono || "",
    run: cliente.run || "",
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email inválido.";
    if (form.telefono && !/^[0-9+\-\s()]{6,}$/.test(form.telefono))
      e.telefono = "Teléfono inválido.";
    if (form.run && !/^[0-9]{6,8}-[0-9kK]$/.test(form.run))
      e.run = "RUN con formato inválido (ej: 12345678-9).";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardar = () => {
    if (!validar()) return;
    onSave({ id: cliente.id, ...form });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Editar Cliente"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardar}>
            Guardar cambios
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Nombre"
          type="text"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          error={errores.nombre}
          placeholder="Nombre completo"
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errores.email}
          placeholder="correo@ejemplo.com"
        />

        <Input
          label="Teléfono"
          type="text"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          error={errores.telefono}
          placeholder="+56 9 1234 5678"
        />

        <Input
          label="RUN"
          type="text"
          value={form.run}
          onChange={(e) => setForm({ ...form, run: e.target.value })}
          error={errores.run}
          placeholder="12345678-9"
        />

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-4">
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            ℹ️ La edición solo modifica los datos del cliente. La mesa asignada y
            el ID no cambiarán.
          </p>
        </div>
      </div>
    </Modal>
  );
}
