const express = require('express');
const router = express.Router();
const controllerProduct = require('../../controllers/products');
const { validateProducto } = require('../../validation/validations_PCP');

router
    .get('/', controllerProduct.obtenerProductos)
    .get('/:id', controllerProduct.obtenerProductosPorId)
    .post ('/', validateProducto , controllerProduct.CrearProductos)
    .put('/:id', controllerProduct.ModificarProductos)
    .delete('/:id', controllerProduct.EliminarProductos)


    module.exports = router;
