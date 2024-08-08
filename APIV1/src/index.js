const express = require('express');
const { Sequelize } = require('sequelize');

const db = require('./../models');
const routerProduct = require('./v1/routers/products');
const routerCategories = require('./v1/routers/categories');
const insumosRoutes = require('./v1/routers/insumos');
const stockInsumosRoutes = require('./v1/routers/stockInsumos');
const historyEntradasRoutes = require('./v1/routers/history_entradas'); // Corregir nombre
const tipoInsumoRoutes = require('./v1/routers/tipo_insumo');
const estadoPedidoRoutes = require('./v1/routers/estado_pedido'); // Corregir nombre
const permisoRoutes = require('./v1/routers/permise'); // Corregir nombre
const clientsRoutes = require('./v1/routers/clients');
const usuariosRoutes = require('./v1/routers/users');
const permiso_usuariosRoutes = require('./v1/routers/permise_users');
const rolRoutes = require('./v1/routers/roles');
const configuracionRouters = require('./v1/routers/configuracion');
const pedidosRouters = require('./v1/routers/pedidos');
const bodyParser = require('body-parser'); // Corregir nombre
const Joi = require('joi');

class Server {
   constructor(){
      this.app = express();
      this.port = process.env.PORT || 3000; // Añadir valor por defecto
      
      this.middlewares();
      this.routers();
      this.syncDatabase();
   }

   middlewares() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(bodyParser.urlencoded({ extended: false })); // Descomentar y corregir
   }

   async syncDatabase() {
      try {
         // await db.sequelize.sync({ force: true });
         await db.sequelize.sync({ alter: true });
         console.log('Todas las tablas han sido sincronizadas o creadas.');
      } catch (error) {
         console.error('Error al sincronizar la base de datos:', error);
      }
   }

   routers() {
      this.app
         .use('/productos', routerProduct)
         .use('/categorias', routerCategories)
         .use('/insumos', insumosRoutes)
         .use('/stock_insumos', stockInsumosRoutes)
         .use('/tipo_insumos', tipoInsumoRoutes) // Consistencia en nombres
         .use('/historial_entradas', historyEntradasRoutes)
         .use('/estado_pedidos', estadoPedidoRoutes)
         .use('/permisos', permisoRoutes) // Consistencia en nombres
         .use('/clientes', clientsRoutes)
         .use('/roles', rolRoutes) // Consistencia en nombres
         .use('/configuracion', configuracionRouters)
         .use('/pedidos', pedidosRouters)
         .use('/usuarios', usuariosRoutes)
         .use('/permiso_usuarios', permiso_usuariosRoutes);

      this.app.get('/', (req, res) => {
         res.send("Welcome");
      });
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log(` http://localhost:${this.port}`);
      });
   }
}

module.exports = Server;
