import React, { useEffect, useState, useMemo } from "react";
import { restLink } from "../services/config";
import dayjs from "./../../node_modules/dayjs/esm/index";

export default function Viajes() {
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    camion: "",
    conductor: "",
    origen: "",
    destino: "",
    combustible: "",
    cantidad_litros: "",
    fecha_salida: "",
    estado: "",
  });

  const pageSize = 5;

  const columns = [
    { key: "camion", label: "Camión", type: "text" },
    { key: "conductor", label: "Conductor", type: "text" },
    { key: "origen", label: "Origen", type: "text" },
    { key: "destino", label: "Destino", type: "text" },
    { key: "combustible", label: "Combustible", type: "text" },
    { key: "cantidad_litros", label: "Cantidad (L)", type: "number" },
    { key: "fecha_salida", label: "Fecha", type: "date" },
    {
      key: "estado",
      label: "Estado",
      type: "select",
      options: ["En tránsito", "Entregado", "Cancelado"],
    },
  ];

  useEffect(() => {
    fetchViajes();
  }, []);

  const fetchViajes = () => {
    setLoading(true);
    restLink
      .get("/viajes")
      .then((res) => setViajes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const filteredData = useMemo(() => {
    if (!search) return viajes;
    return viajes.filter((viaje) =>
      columns.some(({ key }) =>
        String(viaje[key]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, viajes, columns]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortKey] === null) return 1;
      if (b[sortKey] === null) return -1;
      if (a[sortKey] === b[sortKey]) return 0;
      return (
        (a[sortKey] > b[sortKey] ? 1 : -1) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    return sorted;
  }, [sortKey, sortOrder, filteredData]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [currentPage, sortedData]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (viaje) => {
    setFormData({
      ...viaje,
      fecha_salida: dayjs(viaje.fecha_salida).format("YYYY-MM-DD"),
    });
    setShowForm(true);
  };

  const handleDelete = async (viaje) => {
    if (window.confirm("¿Estás seguro de eliminar este viaje?")) {
      try {
        await restLink.delete(`/viajes/${viaje._id}`);
        fetchViajes();
        setMessage({
          text: "Viaje eliminado correctamente",
          type: "success",
        });
      } catch (error) {
        setMessage({
          text: "Error al eliminar viaje",
          type: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await restLink.put(`/viajes/${formData._id}`, {
          ...formData,
          fecha_salida: dayjs(formData.fecha_salida).toISOString(),
        });
      } else {
        await restLink.post("/viajes", {
          ...formData,
          fecha_salida: dayjs(formData.fecha_salida).toISOString(),
        });
      }
      setFormData({
        camion: "",
        conductor: "",
        origen: "",
        destino: "",
        combustible: "",
        cantidad_litros: "",
        fecha_salida: "",
        estado: "",
      });
      setShowForm(false);
      fetchViajes();
      setMessage({
        text: formData._id
          ? "Viaje actualizado correctamente"
          : "Viaje creado correctamente",
        type: "success",
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        text: "Error al crear/actualizar viaje",
        type: "error",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Listado de Viajes</h1>

        <button
          className="btn btn-primary "
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? "Cancelar" : "Nuevo Viaje"}
        </button>
      </div>

      {message && (
        <div
          role="alert"
          className={`alert alert-${
            message.type || "info"
          } text-white mt-4 justify-center mb-4`}
        >
          <span className="text-center font-bold">{message.text}</span>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg border border-base-content/20 shadow-md p-4 bg-base-100"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold ">
              {formData?._id ? `Editar Viaje ${formData._id}` : "Nuevo Viaje"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {columns.map(({ key, label, type, options }) => (
              <div key={key} className="form-control ">
                <label className="label">
                  <span className="label-text">{label}</span>
                </label>
                {type === "select" ? (
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Selecciona {label.toLowerCase()}
                    </option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-success mt-4">
              Guardar Viaje
            </button>
          </div>
        </form>
      )}

      <div className="w-full">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered input-primary w-full  mb-6"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-content/20 shadow-md">
        <table className="table w-full table-zebra table-compact text-center dark:text-white">
          <thead>
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="cursor-pointer select-none"
                  title="Click para ordenar"
                >
                  {label}{" "}
                  {sortKey === key ? (
                    sortOrder === "asc" ? (
                      <span>▲</span>
                    ) : (
                      <span>▼</span>
                    )
                  ) : (
                    <span className="text-base-content/40">⇅</span>
                  )}
                </th>
              ))}
              <th
                className="cursor-pointer select-none"
                title="Click para ordenar"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center">
                  No se encontraron resultados
                </td>
              </tr>
            ) : (
              paginatedData.map((viaje, idx) => (
                <tr key={viaje._id || idx}>
                  {columns.map(({ key }) => (
                    <td key={key}>
                      {key === "estado" ? (
                        <span
                          className={`badge ${
                            viaje[key] === "En tránsito"
                              ? "badge-info"
                              : viaje[key] === "Entregado"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {viaje[key]}
                        </span>
                      ) : key === "fecha_salida" ? (
                        dayjs(viaje[key]).format("DD/MM/YYYY")
                      ) : (
                        String(viaje[key])
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(viaje)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(viaje)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        <span className="text-sm font-semibold">
          Página {currentPage} de {totalPages}
        </span>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
