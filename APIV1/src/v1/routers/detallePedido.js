// routes/insumos.js
const express = require('express');
const router = express.Router();
const DetalleController = require('../../controllers/detalle_pedido');
//const { validateProducto } = require('../../validation/validationsProductos');


router.get('/', DetalleController.ObtenerDetalles);
// router.get('/:id', PedidosController.obtenerPedidosPorId);
router.post('/', DetalleController.CrearDetalles);
// router.put('/:id', PedidosController.ModificarPedidos);
router.delete('/:id', DetalleController.EliminarDetalle);



module.exports = router;
