const express = require('express');
const { Sequelize } = require('sequelize');
const db = require('./../models');
const routerClients = require('./v1/routers/clients');
const routerProduct = require('./v1/routers/products');
const routerCategories = require('./v1/routers/categories');
const insumosRoutes = require('./v1/routers/insumos');
const stockInsumosRoutes = require('./v1/routers/stockInsumos');
const body = require('body-parser');


 
class server {
   constructor(){
   this.app = express();
   this.port = process.env.PORT;
   this.app.use(body.json());
   this.app.use(body.urlencoded({ extended: false}));
   this.Routers();
   }

   Routers(){
      this.app  
            // //PRODUTS   
            // .get('/', (req,res)=>{res.send("Welcome")})         
            // .get('/product',routerProduct)
            // .get('/product/:id',routerProduct)
            // .post('/product',routerProduct)
            // .patch('/product/:id',routerProduct)
            // .delete('/product/:id',routerProduct)

            // //Categor       
            // .get('/categories', routerCategories)
            // .get('/categories/:id',routerCategories)
            // .post('/categories',routerCategories)
            // .patch('/categories/:id',routerCategories)
            // .delete('/categories/:id',routerCategories)

             // Rutas de productos
      .use('/product', routerProduct)
      // Rutas de categorías
      .use('/categories', routerCategories)
      // Rutas de insumos
      .use('/insumos', insumosRoutes)
      // Rutas de stock de insumos
      .use('/stock_insumos', stockInsumosRoutes);

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
     await db.sequelize.sync({ force: true }); 
     await db.sequelize.sync({ alter: true })
     console.log('Todas las tablas han sido sincronizadas o creadas.');
 
   } catch (error) {
     console.error('Error al sincronizar la base de datos:', error);
   }
 }
 
 syncDatabase();
module.exports = server;