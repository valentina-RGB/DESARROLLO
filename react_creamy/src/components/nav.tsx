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
                to="#">
                Los productos más vendidos
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="#">
                Domicilios y pedidos
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                className="sidebar-link text-muted"
                to="#">
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
              <Link to="/Categorias" className="sidebar-link text-muted">
                Crear categoría
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
              <Link to="/historial-entradas" className="sidebar-link text-muted">
                Historial de Entradas
              </Link>
            </li>         
          </ul>
        </li>
        <li className="sidebar-list-item">
          <Link
            className="sidebar-link text-muted"
            to="#"
            data-bs-target="#widgetsProducto"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse">
            <svg className="svg-icon svg-icon-md me-3"></svg>
            <span className="sidebar-link-title">Productos</span>
          </Link>
          <ul className="sidebar-menu list-unstyled collapse" id="widgetsProducto">
            <li className="sidebar-list-item">
              <Link to="/Productos" className="sidebar-link text-muted">
                Lista de Productos
              </Link>
            </li>           
          </ul>
        </li>
        <li className="sidebar-list-item">
          <Link
            className="sidebar-link text-muted"
            to="#"
            data-bs-target="#widgetsPedidos"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse">
            <svg className="svg-icon svg-icon-md me-3"></svg>
            <span className="sidebar-link-title">Pedidos</span>
          </Link>
          <ul className="sidebar-menu list-unstyled collapse" id="widgetsPedidos">
            <li className="sidebar-list-item">
              <Link to="/Pedidos" className="sidebar-link text-muted">
                Crear pedido
              </Link>
            </li>           
          </ul>
        </li>
        <li className="sidebar-list-item">
          <Link
            className="sidebar-link text-muted"
            to="#"
            data-bs-target="#widgetsDropdownbb"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse">
            <svg className="svg-icon svg-icon-md me-3"></svg>
            <span className="sidebar-link-title">Ventas</span>
          </Link>
          <ul className="sidebar-menu list-unstyled collapse" id="widgetsDropdownbb">
            <li className="sidebar-list-item">
              <Link to="/Ventas" className="sidebar-link text-muted">
                Lista de Ventas
              </Link>
            </li>           
          </ul>
        </li>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="widgetsDropdow"
          >
       
          </ul>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#e-commerceDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#delivery-truck-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">E-commerce </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="e-commerceDropdown"
          >
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/e-commerce-products.html"
              >
                Products
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/e-commerce-product-new.html"
              >
                Products - New
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#chartsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#pie-chart-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Charts </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="chartsDropdown"
          >
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/charts.html"
              >
                Charts
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/charts-gauge-sparkline.html"
              >
                Gauge + Sparkline
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#formsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#file-storage-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Forms </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="formsDropdown"
          >
            <li className="sidebar-list-item">
             
            </li>
            <li className="sidebar-list-item">
             
            </li>
            <li className="sidebar-list-item">
            </li>
            <li className="sidebar-list-item">
            </li>
            <li className="sidebar-list-item">
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">

          <ul
            className="sidebar-menu list-unstyled collapse "
            id="tablesDropdown"
          >
            <li className="sidebar-list-item">
                <Link  to="https://demo.bootstrapious.com/bubbly/1-3-2/cms-post-new.html">
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
