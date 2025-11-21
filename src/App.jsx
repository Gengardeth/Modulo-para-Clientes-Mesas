import React, { useState, useMemo } from "react";
import { ESTADOS, mesasIniciales, clientesIniciales, RESERVAS_EJEMPLO } from "./utils/constants";
import TabButton from "./components/TabButton";
import ResumenCard from "./components/ResumenCard";
import MesaCard from "./components/mesas/MesaCard";
import ModalEditarMesa from "./components/mesas/ModalEditarMesa";
import DisponibilidadView from "./components/mesas/DisponibilidadView";
import RegistrarMesasView from "./components/mesas/RegistrarMesasView";
import ClientesView from "./components/clientes/ClientesView";


export default function RestauranteApp() {
  const [mesas, setMesas] = useState(mesasIniciales);
  const [clientes, setClientes] = useState(clientesIniciales);
  const [tab, setTab] = useState("plano");
  const [seleccionada, setSeleccionada] = useState(null);
  const [busquedaMesa, setBusquedaMesa] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [minCap, setMinCap] = useState("");

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header estilo Minimalista */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
          {/* Título principal */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-gray-400 tracking-widest mb-3">
              GESTIÓN DE RESTAURANTE
            </p>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-2">
              Restaurante
            </h1>
            <p className="text-base text-gray-500 font-normal">
              Gestión de mesas y clientes
            </p>
          </div>

          {/* Resumen cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <ResumenCard titulo="Total" valor={resumen.total} color="gray" />
            <ResumenCard titulo="Libres" valor={resumen.libre} color="green" />
            <ResumenCard
              titulo="Ocupadas"
              valor={resumen.ocupado}
              color="red"
            />
            <ResumenCard
              titulo="Reservadas"
              valor={resumen.reservado}
              color="amber"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 sm:gap-3 flex-wrap mb-8">
            <TabButton
              active={tab === "plano"}
              onClick={() => setTab("plano")}
            >
              Plano
            </TabButton>
            <TabButton
              active={tab === "disponibilidad"}
              onClick={() => setTab("disponibilidad")}
            >
              Disponibilidad
            </TabButton>
            <TabButton
              active={tab === "clientes"}
              onClick={() => setTab("clientes")}
            >
              Clientes
            </TabButton>
            <TabButton
              active={tab === "registro"}
              onClick={() => setTab("registro")}
            >
              Registrar
            </TabButton>
          </div>

          {/* Filtros - Tab Plano */}
          {tab === "plano" && (
            <div className="bg-white rounded-xl p-7 border border-gray-200 shadow-sm mb-32">
              <h3 className="text-sm font-semibold text-gray-900 mb-5">
                Filtros
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Mesa
                  </label>
                  <input
                    value={busquedaMesa}
                    onChange={(e) => setBusquedaMesa(e.target.value)}
                    placeholder="Ej: 12"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Estado
                  </label>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition"
                  >
                    <option value="todos">Todos</option>
                    {ESTADOS.map((e) => (
                      <option key={e.key} value={e.key}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Capacidad
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minCap}
                    onChange={(e) => setMinCap(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Buscar
                  </label>
                  <div className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2 cursor-pointer transition font-medium text-xs justify-center">
                    <span>Filtrar</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 -mt-4">
        {tab === "plano" && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 auto-rows-max">
            {mesasFiltradas.map((m) => (
              <MesaCard
                key={m.id}
                mesa={m}
                cliente={
                  clientes.find((c) => c.id === m.clienteId) || null
                }
                onAbrir={() => abrirModalMesa(m)}
                onCambiarEstado={cambiarEstado}
                onAjustarPersonas={ajustarPersonas}
                onDesasignar={() => desasignarMesa(m.id)}
                onAsignar={(clienteId) =>
                  asignarClienteAMesa(clienteId, m.id)
                }
                clientesDisponibles={clientes.filter(
                  (c) => c.mesa == null
                )}
              />
            ))}
          </div>
        )}

        {tab === "disponibilidad" && (
          <DisponibilidadView
            mesas={mesas}
            reservas={RESERVAS_EJEMPLO}
            clientes={clientes}
            onReservar={(mesaId, clienteId) =>
              asignarClienteAMesa(clienteId, mesaId)
            }
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
      </main>

      {/* Footer legend */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 border-t border-gray-200 bg-white">
        <div className="inline-flex items-center gap-6 bg-white rounded-lg px-6 py-3 shadow-sm">
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-xs">Libre</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-xs">Ocupado</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-xs">Reservado</span>
          </span>
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