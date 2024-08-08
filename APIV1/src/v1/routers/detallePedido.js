// routes/insumos.js
const express = require('express');
const router = express.Router();
const DetalleController = require('../../controllers/detalle_pedido');
//const { validateProducto } = require('../../validation/validationsProductos');


router.get('/', DetalleController.obtenerpedidos);
// router.get('/:id', PedidosController.obtenerPedidosPorId);
router.post('/', DetalleController.CrearDetalle);
// router.put('/:id', PedidosController.ModificarPedidos);
router.delete('/:id', DetalleController.EliminarDetalle);



module.exports = router;
