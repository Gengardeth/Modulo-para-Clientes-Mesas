import React, { useState, useMemo, useCallback } from "react";
import { ESTADOS, mesasIniciales, clientesIniciales, RESERVAS_EJEMPLO } from "./utils/constants";
import TabButton from "./components/TabButton";
import ResumenCard from "./components/ResumenCard";
import MesaCard from "./components/mesas/MesaCard";
import ModalEditarMesa from "./components/mesas/ModalEditarMesa";
import DisponibilidadView from "./components/mesas/DisponibilidadView";
import RegistrarMesasView from "./components/mesas/RegistrarMesasView";
import ClientesView from "./components/clientes/ClientesView";
import { Card, Input, Select, Container, StatCard, Section, MesaGrid } from "./components/ui";

export default function RestauranteApp() {
  const [mesas, setMesas] = useState(mesasIniciales);
  const [clientes, setClientes] = useState(clientesIniciales);
  const [tab, setTab] = useState("plano");
  const [seleccionada, setSeleccionada] = useState(null);
  const [busquedaMesa, setBusquedaMesa] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [minCap, setMinCap] = useState("");
  const [reservas, setReservas] = useState({});

  // Resumen de mesas
  const resumen = useMemo(() => {
    return {
      total: mesas.length,
      libre: mesas.filter((m) => m.estado === "libre" && !m.clienteId).length,
      ocupado: mesas.filter((m) => m.estado === "ocupado").length,
      reservado: mesas.filter((m) => m.estado === "reservado").length,
    };
  }, [mesas]);

  // Filtrado de mesas
  const mesasFiltradas = useMemo(() => {
    return mesas.filter((m) => {
      const coincideNumero =
        busquedaMesa === "" || m.id.toString().includes(busquedaMesa);
      const coincideEstado =
        filtroEstado === "todos" || m.estado === filtroEstado;
      const cumpleCapacidad =
        minCap === "" || m.capacidad >= Number(minCap);
      return coincideNumero && coincideEstado && cumpleCapacidad;
    });
  }, [mesas, busquedaMesa, filtroEstado, minCap]);

  // Cambiar estado de mesa
  const cambiarEstado = (mesaId, nuevoEstado) => {
    setMesas((prev) =>
      prev.map((m) => (m.id === mesaId ? { ...m, estado: nuevoEstado } : m))
    );
  };

  // Ajustar personas
  const ajustarPersonas = (mesaId, delta) => {
    setMesas((prev) =>
      prev.map((m) => {
        if (m.id !== mesaId) return m;
        const nuevas = Math.max(0, m.personas + delta);
        // Si llega a 0 y no tiene cliente, pasa a "libre"
        if (nuevas === 0 && !m.clienteId) {
          return { ...m, personas: nuevas, estado: "libre" };
        }
        return { ...m, personas: nuevas };
      })
    );
  };

  // Ajustar capacidad
  const ajustarCapacidad = (mesaId, delta) => {
    setMesas((prev) =>
      prev.map((m) => {
        if (m.id !== mesaId) return m;
        const nuevaCapacidad = Math.max(1, m.capacidad + delta);
        return { ...m, capacidad: nuevaCapacidad };
      })
    );
  };

  // Asignar cliente a mesa
  const asignarClienteAMesa = (clienteId, mesaId) => {
    setMesas((prev) =>
      prev.map((m) =>
        m.id === mesaId ? { ...m, clienteId, estado: "ocupado" } : m
      )
    );
    setClientes((prev) =>
      prev.map((c) => (c.id === clienteId ? { ...c, mesa: mesaId } : c))
    );
  };

  // Desasignar cliente
  const desasignarMesa = (mesaId) => {
    const mesa = mesas.find((m) => m.id === mesaId);
    if (mesa?.clienteId) {
      setClientes((prev) =>
        prev.map((c) =>
          c.id === mesa.clienteId ? { ...c, mesa: null } : c
        )
      );
    }
    setMesas((prev) =>
      prev.map((m) =>
        m.id === mesaId
          ? { ...m, clienteId: null, personas: 0, estado: "libre" }
          : m
      )
    );
  };

  // Modales
  const abrirModalMesa = (mesa) => setSeleccionada(mesa);
  const cerrarModalMesa = () => setSeleccionada(null);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm overflow-y-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto">
          {/* Encabezado Premium */}
          <div className="mb-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <p className="text-xs font-bold tracking-widest mb-2 uppercase opacity-90">
              ⚙️ Sistema de Gestión Avanzado
            </p>
            <h1 className="text-5xl font-black tracking-tight mb-2">
              Restaurante Pro
            </h1>
            <p className="text-base opacity-90 font-semibold">
              Gestión integral de mesas y clientes en tiempo real
            </p>
          </div>

          {/* Tarjetas de Resumen - Premium */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
            <ResumenCard titulo="Total Mesas" valor={resumen.total} color="gray" />
            <ResumenCard titulo="Disponibles" valor={resumen.libre} color="green" />
            <ResumenCard titulo="Ocupadas" valor={resumen.ocupado} color="red" />
            <ResumenCard titulo="Reservadas" valor={resumen.reservado} color="amber" />
          </div>

          {/* Tabs de Navegación */}
          <div className="flex gap-3 flex-wrap mb-8 pb-4 border-b border-gray-200">
            <TabButton active={tab === "plano"} onClick={() => setTab("plano")}>
              📊 Plano
            </TabButton>
            <TabButton
              active={tab === "disponibilidad"}
              onClick={() => setTab("disponibilidad")}
            >
              📅 Disponibilidad
            </TabButton>
            <TabButton active={tab === "clientes"} onClick={() => setTab("clientes")}>
              👥 Clientes
            </TabButton>
            <TabButton active={tab === "registro"} onClick={() => setTab("registro")}>
              ➕ Registrar
            </TabButton>
          </div>

          {/* Filtros - Tab Plano */}
          {tab === "plano" && (
            <Card className="p-6 mt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">
                🔍 Filtros Avanzados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  label="Mesa"
                  type="text"
                  value={busquedaMesa}
                  onChange={(e) => setBusquedaMesa(e.target.value)}
                  placeholder="Ej: 12"
                />
                <Select
                  label="Estado"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  options={[
                    { value: "todos", label: "Todos" },
                    ...ESTADOS.map((e) => ({
                      value: e.key,
                      label: e.label,
                    })),
                  ]}
                />
                <Input
                  label="Capacidad Mínima"
                  type="number"
                  min={0}
                  value={minCap}
                  onChange={(e) => setMinCap(e.target.value)}
                  placeholder="Ej: 4"
                />
                <div className="flex items-end">
                  <button className="w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition">
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full overflow-auto bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          {tab === "plano" && (
            <div>
              {/* Separador visual */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  <h2 className="text-3xl font-black text-gray-900">Distribución de Mesas</h2>
                </div>
                <p className="text-sm text-gray-600 ml-4 font-semibold">{mesasFiltradas.length} mesa(s) disponible(s)</p>
              </div>

              {mesasFiltradas.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <p className="text-lg text-gray-500 font-bold">
                    ℹ️ No hay mesas que coincidan con los filtros
                  </p>
                </div>
              ) : (
                <MesaGrid>
                  {mesasFiltradas.map((m) => (
                    <MesaCard
                      key={m.id}
                      mesa={m}
                      cliente={clientes.find((c) => c.id === m.clienteId) || null}
                      onAbrir={() => abrirModalMesa(m)}
                      onCambiarEstado={cambiarEstado}
                      onAjustarPersonas={ajustarPersonas}
                      onAjustarCapacidad={ajustarCapacidad}
                      onDesasignar={() => desasignarMesa(m.id)}
                      onAsignar={(clienteId) => asignarClienteAMesa(clienteId, m.id)}
                      clientesDisponibles={clientes.filter((c) => c.mesa == null)}
                      reserva={Object.values(reservas).flat().find(r => r.mesaId === m.id) || null}
                    />
                  ))}
                </MesaGrid>
              )}
            </div>
          )}

          {tab === "disponibilidad" && (
            <DisponibilidadView
              mesas={mesas}
              reservas={reservas}
              clientes={clientes}
              onReservar={(mesaId, clienteId, hora) => {
                const cliente = clientes.find(c => c.id === clienteId);
                setReservas(prev => ({
                  ...prev,
                  [hora]: [...(prev[hora] || []), { mesaId, clienteNombre: cliente?.nombre, clienteId, hora }]
                }));
                asignarClienteAMesa(clienteId, mesaId);
              }}
            />
          )}

          {tab === "clientes" && (
            <ClientesView
              clientes={clientes}
              setClientes={setClientes}
              mesas={mesas}
              onAsignar={asignarClienteAMesa}
            />
          )}

          {tab === "registro" && (
            <RegistrarMesasView mesas={mesas} setMesas={setMesas} />
          )}
        </div>
      </main>

      {/* Footer Legend */}
      <footer className="w-full bg-white border-t border-gray-200 shadow-lg">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-gray-700">Libre</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-red-400" />
              <span className="text-sm font-medium text-gray-700">Ocupado</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-amber-400" />
              <span className="text-sm font-medium text-gray-700">Reservado</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal editar mesa */}
      {seleccionada && (
        <ModalEditarMesa
          mesa={seleccionada}
          onClose={cerrarModalMesa}
          onSave={(parciales) => {
            cambiarEstado(seleccionada.id, parciales.estado);
            setMesas((prev) =>
              prev.map((m) =>
                m.id === seleccionada.id
                  ? { ...m, personas: parciales.personas }
                  : m
              )
            );
            cerrarModalMesa();
          }}
        />
      )}
    </div>
  );
}