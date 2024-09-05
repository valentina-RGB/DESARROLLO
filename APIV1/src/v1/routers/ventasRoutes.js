const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/VentasController');


router.post('/Ventas', ventasController.createVenta);


router.get('/Ventas', ventasController.getAllVentas);


router.get('/Ventas/:id', ventasController.getVentaById);


router.delete('/Ventas/:id', ventasController.deleteVenta);

module.exports = router;
