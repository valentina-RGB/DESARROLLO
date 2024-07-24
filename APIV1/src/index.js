const express = require('express');
const routerProduct = require('./v1/routers/products');
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
            //PRODUTS   
            .get('/', (req,res)=>{res.send("Welcome")})         
            .get('/product',routerProduct)
            .get('/product/:id',routerProduct)
            .post('/product',routerProduct)

   }

   Listen (){
      this.app.listen(this.port, () =>{
         console.log(` http://localhost:${this.port}`)
      });
   }

}

module.exports = server;