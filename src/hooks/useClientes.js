import { useState, useCallback, useMemo } from 'react';

export function useClientes(clientesIniciales) {
  const [clientes, setClientes] = useState(clientesIniciales);

  const agregarCliente = useCallback((nuevoCliente) => {
    setClientes((prev) => [...prev, { id: Date.now(), ...nuevoCliente, mesa: null }]);
  }, []);

  const eliminarCliente = useCallback((clienteId) => {
    setClientes((prev) => prev.filter((c) => c.id !== clienteId));
  }, []);

  const actualizarCliente = useCallback((clienteId, datos) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === clienteId ? { ...c, ...datos } : c))
    );
  }, []);

  const clientesDisponibles = useMemo(
    () => clientes.filter((c) => c.mesa == null),
    [clientes]
  );

  return {
    clientes,
    setClientes,
    agregarCliente,
    eliminarCliente,
    actualizarCliente,
    clientesDisponibles,
  };
}
