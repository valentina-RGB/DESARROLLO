const express = require('express');
const {request , response} = require('express');

const db = require('../../models');
const Productos = db.Productos;

    const 


    getProductos = async (res,req) => {
      const productos = await Productos.findAll();
        res.status(200).json(productos);
    },
        
    getProductosID = async (id) => {
      const productos = await Productos.findByPk(id);
        return productos;
    } ,

    CreateProdutos = async (datos) => {
        const productos = await Productos.create(datos);
        return productos;

    },
        
    PatchProductos = async (id, datos) => {
      const [updated] = await Productos.update(datos, {
        where: { ID_producto:id },
      });

      if (updated) {
        const updatedProductos = await Productos.findByPk(id);
        return updatedProductos;

      }else{
        return { status: 404, message: 'Product not found' };
      }
    },

    DeleteProductos = async (id) => {
      const deleted = await Productos.destroy({ where: {ID_producto: id}, });
      if (deleted) {
        return deleted;
      }else{
        return {status: 404, message: 'Product not found' };
      }
    } 


module.exports = {
  getProductos,
  getProductosID,
  CreateProdutos,
  PatchProductos,
  DeleteProductos,
}