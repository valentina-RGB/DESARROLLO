import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-dt';
import api from '../../api/api';
import '../../datatables.css';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('A');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [editID, setEditID] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (categorias.length > 0) {
      new DataTable('#categoriasTable');
    }
  }, [categorias]);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
      setError('Error al cargar las categorías.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoriaData = {
      descripcion,
      estado_categoria: estado,
      imagen,
    };

    try {
      if (editID) {
        await api.put(`/categorias/${editID}`, categoriaData);
      } else {
        await api.post('/categorias', categoriaData);
      }
      resetForm();
      fetchCategorias();
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
      setError('Error al guardar la categoría.');
    }
  };

  const handleEdit = (categoria: any) => {
    setDescripcion(categoria.descripcion);
    setEstado(categoria.estado_categoria);
    setImagen(categoria.imagen);
    setEditID(categoria.ID_categoria);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/categorias/${id}`);
      fetchCategorias();
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      setError('Error al eliminar la categoría.');
    }
  };

  const resetForm = () => {
    setDescripcion('');
    setEstado('A');
    setImagen('');
    setEditID(null);
    setError(null);
  };

  return (
    <>
      <div className="d-flex align-items-stretch">
        <div className="page-holder bg-gray-100">
          <div className="container-fluid px-lg-4 px-xl-5">
            <div className="page-header">
              <h1 className="page-heading">Categorías</h1>
            </div>
            <section>
              <div className="row mb-5">
                <div className="col-lg-4">
                  <div className="card mb-4 mb-lg-0">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="form-label" htmlFor="descripcion">
                            Nombre de la categoría
                          </label>
                          <input
                            className="form-control"
                            id="descripcion"
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label" htmlFor="estado">
                            Estado
                          </label>
                          <select
                            className="form-select"
                            id="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                          >
                            <option value="A">Activa</option>
                            <option value="I">Inactiva</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="form-label" htmlFor="imagen">
                            Imagen
                          </label>
                          <input
                            className="form-control"
                            id="imagen"
                            type="text"
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                            required
                          />
                        </div>
                        <button className="btn btn-primary mb-4" type="submit">
                          {editID ? 'Guardar cambios' : 'Añadir nueva categoría'}
                        </button>
                        {editID && (
                          <button
                            type="button"
                            className="btn btn-secondary mb-4"
                            onClick={resetForm}
                          >
                            Cancelar
                          </button>
                        )}
                      </form>
                      {error && <p className="text-danger">{error}</p>}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card card-table">
                    <div className="py-2 px-3">
                      <table id="categoriasTable" className="table table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categorias.map((categoria: any) => (
                            <tr key={categoria.ID_categoria}>
                              <td>{categoria.ID_categoria}</td>
                              <td>{categoria.descripcion}</td>
                              <td>{categoria.estado_categoria}</td>
                              <td>{categoria.imagen}</td>
                              <td>
                                <button
                                  className="btn btn-warning btn-sm me-2"
                                  onClick={() => handleEdit(categoria)}
                                >
                                  Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(categoria.ID_categoria)}
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categorias;
