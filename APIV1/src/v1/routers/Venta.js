const express = require('express');
const router = express.Router();
const VentaController = require('../../controllers/VentasController');

router
  .post('/ventas', VentaController.createVenta)
  .get('/ventas', VentaController.getAllVentas)
  .get('/ventas/:ID_venta', VentaController.getVentaById)
  .patch('/ventas/:ID_venta', VentaController.updateVenta)
  .delete('/ventas/:ID_venta', VentaController.deleteVenta);

module.exports = router;