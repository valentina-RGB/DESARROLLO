// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import "./App.css";
import Menu from "./components/nav";
import Dashboard from "./page/Dashboard";
import Categorias from "./page/Categorias/Categorias";
import Insumos from "./page/Insumos/Insumos-list";
import AddInsumo from "./page/Insumos/CreateInsumo";
import EditInsumo from "./page/Insumos/EditInsumo";
import AddRol from './page/Roles/CreateRol';
import ListarRoles from './page/Roles/ListRol';
import AddCliente from './page/Clientes/CreateCliente';
import ListarClientes from './page/Clientes/ListCliente';
import ListarUsuarios from './page/Usuarios/ListUsuario';
import AddUsuario from './page/Usuarios/CreateUsuario';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="d-flex align-items-stretch">
      <Menu>
        
      </Menu>
        <div className="page-holder bg-gray-100">
          <div className="container-fluid px-lg-4 px-xl-5">
            <div className="page-header">
              <h1 className="page-heading">Dashboard heladeria las valem</h1>
            </div>
             {/* Definición de rutas */}
       <Routes>
          <Route path="/"   element={<Navigate to="/Dashboard" />}  />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Nueva-categorias" element={<Categorias/>} />
          <Route path="/Insumos" element={<Insumos/>} />
          <Route path="/Insumos/Add" element={<AddInsumo />} />
          <Route path="/Insumos/Edit/:id" element={<EditInsumo />} />
          <Route path="/roles" element={<ListarRoles />} />
          <Route path="/agregar-rol" element={<AddRol />} />
          <Route path="/Clientes" element={<ListarClientes />} />
          <Route path="/agregar-cliente" element={<AddCliente />} />
          <Route path="/Usuarios" element={<ListarUsuarios />} />
          <Route path="/agregar-usuario" element={<AddUsuario />} />
          

        </Routes>
            
            {/* <Dashboard></Dashboard> */}
            <footer className="footer bg-white shadow align-self-end py-3 px-xl-5 w-100">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 text-center text-md-start fw-bold">
                    <p className="mb-2 mb-md-0 fw-bold">
                      Your company &copy; 2023
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
    </Router>
  );
}

export default App;
