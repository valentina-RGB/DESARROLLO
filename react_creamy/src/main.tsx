import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
// import 'react-data-table-component'
// import 'datatables.net-dt'
import './datatables.css';


// import 
// import 'bootstrap/dist/css/bootstrap.min.css'
 import './App.css'
import Lista from './components/Lista_categoria.tsx';
// import  'bootstrap/dist/js/bootstrap.min'
// import   'react-chartjs-2';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Lista/>
  </React.StrictMode>,
)







