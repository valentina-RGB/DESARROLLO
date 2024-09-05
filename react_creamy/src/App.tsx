import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from "./components/nav";
import Dashboard from "./page/Dashboard";
import Categorias from "./page/Categorias/Categories-list";
import Insumos from "./page/Insumos/Insumos-list";
import Ventas from "./page/Ventas/VentasList";
import ListarRoles from './page/Roles/ListRol';
import AddCliente from './page/Clientes/CreateCliente';
import ListarClientes from './page/Clientes/ListCliente';
import ListarUsuarios from './page/Usuarios/ListUsuario';
/* import AddUsuario from './page/Usuarios/CreateUsuario'; */
import EditarCliente from './page/Clientes/EditCliente';
/* import EditarUsuario from './page/Usuarios/EditUsuario'; */

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex align-items-stretch ">
        <div className=''></div>
        <Menu />
        {/* <div className=' min-height-200 bg-primary position-absolute w-100'></div> */}
        <div className="page-holder">
          
          <div className="container-fluid px-lg-4 px-xl-5">
            {/* Definición de rutas */}
            <Routes>
              <Route path="/" element={<Navigate to="/Dashboard" />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Categorias" element={<Categorias />} />
              <Route path="/Insumos" element={<Insumos />} />
              <Route path="/Ventas" element={<Ventas/>} />
              <Route path="/roles" element={<ListarRoles />} />
              <Route path="/Clientes" element={<ListarClientes />} />
              <Route path="/agregar-cliente" element={<AddCliente />} />
              <Route path="/editar-cliente/:id" element={<EditarCliente />} />
              <Route path="/Usuarios" element={<ListarUsuarios />} />{/* 
              <Route path="/agregar-usuario" element={<AddUsuario />}  */}{/* /> */}{/* 
              <Route path="/editar-usuario/:id" element={<EditarUsuario />} /> */}
            </Routes>
            <footer className="footer bg-white shadow align-self-end py-3 px-xl-5 w-100">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 text-center text-md-start fw-bold">
                    <p className="mb-2 mb-md-0 fw-bold">
                      Creamy Soft &copy; 2024
                    </p>
                  </div>
                  <div className="col-md-6 text-center text-md-end text-gray-400">
                    <p className="mb-0">Version 1.3.2</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} /> {/* Toaster debería estar aquí */}
    </Router>
  );
};

export default App;
