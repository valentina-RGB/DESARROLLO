import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from "./components/nav";
//import Navbar from "./components/navbar";
import Dashboard from "./page/Dashboard";
import Categorias from "./page/Categorias/Categorias";
import Insumos from "./page/Insumos/Insumos-list";
//import ListadoVentas from './page/Ventas/ventas-list';

import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex align-items-stretch">
        <Menu />
     
        <div className="page-holder bg-gray-100">
          <div className="container-fluid px-lg-1 px-xl-4">
            <Routes>
              <Route path="/" element={<Navigate to="/Dashboard" />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Nueva-categorias" element={<Categorias />} />
              <Route path="/Insumos" element={<Insumos />} />
              
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