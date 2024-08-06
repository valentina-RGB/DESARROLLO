const express = require('express');
const router = express.Router();
const controllerProduct = require('../../controllers/products');
const { validateProducto } = require('../../validation/validationsProductos');

router
    .get('/', controllerProduct.obtenerProductos)
    .get('/:id', controllerProduct.obtenerProductosPorId)
    .post ('/', validateProducto , controllerProduct.CrearProductos)
    .put('/:id', controllerProduct.ModificarProductos)
    .delete('/:id', controllerProduct.EliminarProductos)


    module.exports = router;
