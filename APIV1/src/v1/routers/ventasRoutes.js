const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/VentasController');


router.post('/ventas', ventasController.createVenta);


router.get('/ventas', ventasController.getAllVentas);


router.get('/ventas/:id', ventasController.getVentaById);


router.delete('/ventas/:id', ventasController.deleteVenta);

module.exports = router;
