
import Lista from '../../components/Lista_categoria';
import '../../datatables.css';

function Categorias() {

  return (
    <>
    <div className="d-flex align-items-stretch">

    <div className="page-holder bg-gray-100">
    <div className="container-fluid px-lg-4 px-xl-5">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-heading">Categorías :)</h1>
      </div>
      <section>
        <div className="row mb-5">
          <div className="col-lg-4">
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <div className="mb-4">
                  <label className="form-label" htmlFor="categoryName">
                    Nombre de la categoría
                  </label>
                  <input
                    className="form-control"
                    id="categoryName"
                    type="text"
                    value={""}
                  />
                  <div className="form-text">
                    Aqui pondrás el nombre que le quieres poner a la categoría de tus productos.
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="estado">
                    Estado
                  </label>
                  <select
                    className="form-select"
                    id="estado"
                    name="estado"
                  >
                    <option value="A">Activa</option>
                    <option value="I">Inactiva</option>
                  </select>
                 
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="categoryParent">
                    Descripción
                  </label>   
                  <textarea
                    className="form-control"
                    id="Imagen"
                    name="Imagen"
                  ></textarea>

                  <div className="form-text">
                    Este campo es opcional.
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="Imagen">
                    Parent
                  </label>
                 
                  <div className="form-text">
                    Este campo es opcional
                  </div>
                </div>
                <button className="btn btn-primary mb-4">
                  Añadir nueva categoría
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card card-table">
              <div className="py-2 px-3">
                <Lista></Lista>
                {/* <span className="me-2" id="categoryBulkAction">
                  <select
                    className="form-select form-select-sm d-inline w-auto mb-1 mb-lg-0"
                    name="categoryBulkAction"
                  >
                    <option>Bulk Actions</option>
                    <option>Delete</option>
                  </select>
                  <button className="btn btn-sm btn-outline-primary align-top mb-1 mb-lg-0">
                    Apply
                  </button>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    </div>
    
    </div>
    </>
  )
}

export default Categorias