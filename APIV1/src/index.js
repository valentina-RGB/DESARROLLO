const express = require('express');
const { Sequelize } = require('sequelize');

const db = require('./../models');
const routerClients = require('./v1/routers/clients');
const routerProduct = require('./v1/routers/products');
const routerCategories = require('./v1/routers/categories');
const insumosRoutes = require('./v1/routers/insumos');
const stockInsumosRoutes = require('./v1/routers/stockInsumos');
const History_entradasRoutes = require('./v1/routers/History_entradas');
const Estado_pedidoRoutes = require('./v1/routers/estado_pedido');
const body = require('body-parser');
const Joi = require('joi');

 
class server {
   constructor(){
   this.app = express();
   this.port = process.env.PORT;
   
   this.app.use(express.json());
   this.app.use(express.urlencoded({ extended: true }));
   //this.app.use(body.urlencoded({ extended: false}));
   this.Routers();
   }

   Routers(){
      this.app  
      // Rutas de productos
      .use('/productos', routerProduct)
      // Rutas de categorías
      .use('/categorias', routerCategories)
      // Rutas de insumos
      .use('/insumos', insumosRoutes)
      // Rutas de stock de insumos
      .use('/stock_insumos', stockInsumosRoutes)
      // Rutas de historial de entradas
      .use('/historial_entradas', History_entradasRoutes)
      //Rutas de estado del pedido
      .use('/Estado',Estado_pedidoRoutes)

      this.app.get('/', (req, res) => {
         res.send("Welcome");
       });
   }

   Listen (){
      this.app.listen(this.port, () =>{
         console.log(` http://localhost:${this.port}`)
      });
   }

}
async function syncDatabase() {
   try {
     //await db.sequelize.sync({ force: true }); 
     await db.sequelize.sync({ alter: true })
     console.log('Todas las tablas han sido sincronizadas o creadas.');
 
   } catch (error) {
     console.error('Error al sincronizar la base de datos:', error);
   }
 }
 
 syncDatabase();
module.exports = server;