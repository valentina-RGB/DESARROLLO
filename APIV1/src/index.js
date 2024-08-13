const express = require('express');
const { Sequelize } = require('sequelize');

const db = require('./../models')
const detalleRoutes = require('./v1/routers/detallePedido');
const routerProduct = require('./v1/routers/products');
const routerCategories = require('./v1/routers/categories');
const insumosRoutes = require('./v1/routers/insumos');
const stockInsumosRoutes = require('./v1/routers/stockInsumos');
const historyEntradasRouter = require('./v1/routers/History_entradas');
const tipoInsumoRoutes = require('./v1/routers/tipo_insumo');
const Estado_pedidoRoutes = require('./v1/routers/estado_pedido');
const permisoRoutes = require('./v1/routers/permise');
const clientsRoutes = require('./v1/routers/clients');
const usuariosRoutes = require('./v1/routers/users');
const permiso_rolesRoutes = require('./v1/routers/permise_roles');
const rolRoutes = require('./v1/routers/roles');
const configuracionRouters = require('./v1/routers/configuracion');
const pedidosRouters = require('./v1/routers/pedidos');
const VentasRouters = require('./v1/routers/ventasRoutes');
const bodyParser = require('body-parser'); // Corregir nombre
const Joi = require('joi');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    //this.app.use(body.urlencoded({ extended: false}));
    this.Routers();

    this.syncDatabase();
  }

   syncDatabase =async()=> {
      try {
        // await db.sequelize.sync({ force: true }); 
         await db.sequelize.sync({ alter: true })
        console.log('Todas las tablas han sido sincronizadas o creadas.');
    
      } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
      }
    }

  Routers() {
    this.app
      // Rutas de productos
      .use('/productos', routerProduct)
      // Rutas de categorías
      .use('/categorias', routerCategories)
      // Rutas de insumos
      .use('/insumos', insumosRoutes)
      // Rutas de stock de insumos
      .use('/stock_insumos', stockInsumosRoutes)
      //Rutas tipo_insumo
      .use('/tipoInsumos', tipoInsumoRoutes)
      // Rutas de historial de entradas
      .use('/historial_entradas', historyEntradasRouter)
      //Rutas de estado del pedidoo
      .use('/Estado',Estado_pedidoRoutes)

      //Rutas de venta
      .use('/Ventas', VentasRouters)

      .use('/Clientes', clientsRoutes)

      .use('/roles', rolRoutes)

      .use('/configuracin', configuracionRouters)

      .use('/pedidos', pedidosRouters)

      .use('/detalle', detalleRoutes)

      .use('/permiso_roles', permiso_rolesRoutes)

      .use('/usuarios', usuariosRoutes)

      .use('/permiso', permisoRoutes)


    this.app.get('/', (req, res) => {
      res.send("Welcome");
    });
  }

  Listen() {
    this.app.listen(this.port, () => {
      console.log(` http://localhost:${this.port}`)
    });
  }

}

module.exports = Server;
