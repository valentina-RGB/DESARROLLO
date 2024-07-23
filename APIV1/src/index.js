const express = require('express');
const routerProduct = require('./v1/routers/products');

class server {

   constructor(){

   this.app = express();

   this.port = process.env.PORT;

   this.Routers();

   }

   Routers(){
      this.app     
            .get('/', (req,res)=>{
            res.send("Welcome")})
            
            .get('/product',routerProduct)
            .get('/product/:id',routerProduct)

   }

   Listen (){
      this.app.listen(this.port, () =>{
         console.log(` http://localhost:${this.port}`)
      });
   }

}

module.exports = server;