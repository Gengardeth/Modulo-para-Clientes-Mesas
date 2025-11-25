import { useState } from "react";
import { ESTADOS } from "../../utils/constants";
import { Modal, Button, Select, Input } from "../ui";

export default function ModalEditarMesa({ mesa, onClose, onSave }) {
  const [estado, setEstado] = useState(mesa.estado);
  const [personas, setPersonas] = useState(mesa.personas);

  const handleSave = () => {
    onSave({ estado, personas });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Editar Mesa #${mesa.id}`}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar cambios
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Estado */}
        <Select
          label="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          options={ESTADOS.map((e) => ({
            label: e.label,
            value: e.key,
          }))}
        />

        {/* Personas */}
        <div>
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-3">
            Personas (0–{mesa.capacidad})
          </label>
          <div className="flex gap-3 items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPersonas((p) => Math.max(0, p - 1))}
            >
              −
            </Button>
            <Input
              type="number"
              min={0}
              max={mesa.capacidad}
              value={personas}
              onChange={(e) =>
                setPersonas(
                  Math.max(0, Math.min(mesa.capacidad, Number(e.target.value || 0)))
                )
              }
              className="text-center flex-1"
              containerClass="flex-1"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPersonas((p) => Math.min(mesa.capacidad, p + 1))}
            >
              +
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            ℹ️ La mesa volverá a estado "Libre" automáticamente si no tiene cliente
            asignado y el número de personas llega a 0.
          </p>
        </div>
      </div>
    </Modal>
  );
}
