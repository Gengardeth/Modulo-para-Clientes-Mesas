import { useState, useCallback, useMemo } from 'react';

export function useMesas(mesasIniciales) {
  const [mesas, setMesas] = useState(mesasIniciales);

  const cambiarEstado = useCallback((mesaId, nuevoEstado) => {
    setMesas((prev) =>
      prev.map((m) => (m.id === mesaId ? { ...m, estado: nuevoEstado } : m))
    );
  }, []);

  const ajustarPersonas = useCallback((mesaId, delta) => {
    setMesas((prev) =>
      prev.map((m) => {
        if (m.id !== mesaId) return m;
        const nuevas = Math.max(0, m.personas + delta);
        if (nuevas === 0 && !m.clienteId) {
          return { ...m, personas: nuevas, estado: 'libre' };
        }
        return { ...m, personas: nuevas };
      })
    );
  }, []);

  const desasignarMesa = useCallback((mesaId) => {
    setMesas((prev) =>
      prev.map((m) =>
        m.id === mesaId
          ? { ...m, clienteId: null, personas: 0, estado: 'libre' }
          : m
      )
    );
  }, []);

  return {
    mesas,
    setMesas,
    cambiarEstado,
    ajustarPersonas,
    desasignarMesa,
  };
}
