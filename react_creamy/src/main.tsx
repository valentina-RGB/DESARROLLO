import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { ThemeProvider } from "@material-tailwind/react";

// import 'react-data-table-component'
// import 'datatables.net-dt'
import './datatables.css';


// import 
// import 'bootstrap/dist/css/bootstrap.min.css'
 import './App.css'
import AuthPage from './page/Acceso/login.tsx';
import { Toaster } from 'react-hot-toast';
// import  'bootstrap/dist/js/bootstrap.min'
//  import   'react-chartjs-2';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <Toaster  position="top-right" reverseOrder={false} />
    <AuthPage />
    {/* <App /> */}
  </React.StrictMode>,
)







