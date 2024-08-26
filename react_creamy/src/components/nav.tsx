import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="sidebar py-3" id="sidebar">
      <h6 className="sidebar-heading">Creamy Soft</h6>
      <ul className="list-unstyled">
        <li className="sidebar-list-item">
          <Link
            className="sidebar-link text-muted active collapsed"
            to="/Dashboard"
            data-bs-target="#dashboardsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse">
            <svg className="svg-icon svg-icon-md me-3"></svg>
            <span className="sidebar-link-title">Dashboard</span>
          </Link>
          <ul
            className="sidebar-menu list-unstyled collapse"
            id="dashboardsDropdown">
            <li className="sidebar-list-item">
              <Link className="sidebar-link active text-muted" to="/Dashboard">
                Todo
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="https://demo.bootstrapious.com/bubbly/1-3-2/index-cms.html">
                Los productos más vendidos
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="https://demo.bootstrapious.com/bubbly/1-3-2/index-e-commerce.html">
                Domiciolios y pedidos
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="https://demo.bootstrapious.com/bubbly/1-3-2/index-projects.html">
                Balance de insumos
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <Link
            className="sidebar-link text-muted"
            to="#"
            data-bs-target="#cmsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse">
            <svg className="svg-icon svg-icon-md me-3"></svg>
            <span className="sidebar-link-title">Categorías</span>
          </Link>
          <ul className="sidebar-menu list-unstyled collapse" id="cmsDropdown">
            <li className="sidebar-list-item">
              <Link to="/Nueva-categorias" className="sidebar-link text-muted">
                Crear categoría
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post-new.html">
                Ver detalles de las categorías
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <Link
            className="sidebar-link text-muted"
            to="#"
            data-bs-target="#widgetsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse">
            <svg className="svg-icon svg-icon-md me-3"></svg>
            <span className="sidebar-link-title">Insumos</span>
          </Link>
          <ul className="sidebar-menu list-unstyled collapse" id="widgetsDropdown">
            <li className="sidebar-list-item">
              <Link to="/Insumos" className="sidebar-link text-muted">
                Lista de insumos
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post-new.html">
                Ver detalles de los insumos
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
