const express = require('express');
const routerProduct = require('./v1/routers/products');
const routerCategories = require('./v1/routers/categories');
const routerClients = require('./v1/routers/clients');
const body = require('body-parser');
const routerClients = require('./v1/routers/clients');
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
            //PRODUTS   
            .get('/', (req,res)=>{res.send("Welcome")})         
            .get('/product',routerProduct)
            .get('/product/:id',routerProduct)
            .post('/product',routerProduct)
            .patch('/product/:id',routerProduct)
            .delete('/product/:id',routerProduct)

            //Categor       
            .get('/categories', routerCategories)
            .get('/categories/:id',routerCategories)
            .post('/categories',routerCategories)
            .patch('/categories/:id',routerCategories)
            .delete('/categories/:id',routerCategories)

            //CLIENTS
            .get('/clients', routerClients)
            .get('/clients/:id', routerClients)
            .post('/clients', routerClients)
            .patch('/clients/:id', routerClients)
            .delete('/clients/:id', routerClients)

            //ROLES
            .get('/roles', routerRoles)
            .get('/roles/:id', routerRoles)
            .post('/roles', routerRoles)
            .patch('/roles/:id', routerRoles)
            .delete('/roles/:id', routerRoles)

            //ACCESS
            .get('/access', routerAccess)
            .get('/access/:id', routerAccess)
            .post('/access', routerAccess)
            .patch('/access/:id', routerAccess)
            .delete('/access/:id', routerAccess)

   }

   Listen (){
      this.app.listen(this.port, () =>{
         console.log(` http://localhost:${this.port}`)
      });
   }

}

module.exports = server;