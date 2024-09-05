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
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#widgetsDropdow"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#statistic-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Widgets </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="widgetsDropdow"
          >
            {/* <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/widgets-stats.html"
              >
                Stats
              </a>
            </li> */}
            {/* <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/widgets-data.html"
              >
                Data
              </a>
            </li> */}
          </ul>
        </li>
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
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/e-commerce-orders.html"
              >
                Orders
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/e-commerce-order.html"
              >
                Order - Detail
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/e-commerce-customers.html"
              >
                Customers
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#pagesDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#paper-stack-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Pages </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="pagesDropdown"
          >
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/pages-profile.html"
              >
                Profile
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/pages-pricing.html"
              >
                Pricing table
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/pages-contacts.html"
              >
                Contacts
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/pages-invoice.html"
              >
                Invoice
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/pages-knowledge-base.html"
              >
                Knowledge base
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/pages-knowledge-base-topic.html"
              >
                Knowledge base - Topic
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#userDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#man-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Usuarios </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="userDropdown"
          >
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/login.html"
              >
                Login page
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/register.html"
              >
                <li className="sidebar-list-item">
              <Link to="/Clientes" className="sidebar-link text-muted">Clientes</Link>
            </li>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
               // href="https://demo.bootstrapious.com/bubbly/1-3-2/login-2.html"
              >
                <li className="sidebar-list-item">
              <Link to="/Roles" className="sidebar-link text-muted">Roles</Link>
            </li>
                <span className="badge bg-info ms-2 text-decoration-none">
                  New
                </span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="../../Roles/ListRol"
              >
                 <li className="sidebar-list-item">
              <Link to="/Usuarios" className="sidebar-link text-muted">Usuarios</Link>
            </li>
                <span className="badge bg-info ms-2 text-decoration-none">
                  New
                </span>
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#componentsDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#sorting-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Components </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="componentsDropdown"
          >
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-cards.html"
              >
                Cards
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-calendar.html"
              >
                Calendar
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-gallery.html"
              >
                Gallery
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-loading-buttons.html"
              >
                Loading buttons
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-map.html"
              >
                Maps
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-notifications.html"
              >
                Notifications
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/components-preloader.html"
              >
                Preloaders
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
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/forms.html"
              >
                Basic forms
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/forms-advanced.html"
              >
                Advanced forms
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/forms-dropzone.html"
              >
                Files upload
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/forms-texteditor.html"
              >
                Text editor
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/forms-validation.html"
              >
                Validation
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-list-item">
          <a
            className="sidebar-link text-muted "
            href="#"
            data-bs-target="#tablesDropdown"
            role="button"
            aria-expanded="false"
            data-bs-toggle="collapse"
          >
            <svg className="svg-icon svg-icon-md me-3">
              {/* <use xlink:href="https://demo.bootstrapious.com/bubbly/1-3-2/icons/orion-svg-sprite.71e9f5f2.svg#grid-1"> </use> */}
            </svg>
            <span className="sidebar-link-title">Tables </span>
          </a>
          <ul
            className="sidebar-menu list-unstyled collapse "
            id="tablesDropdown"
          >
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/tables.html"
              >
                Bootstrap tables
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                className="sidebar-link text-muted"
                href="https://demo.bootstrapious.com/bubbly/1-3-2/tables-datatable.html"
              >
                Datatable
              </a>

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
