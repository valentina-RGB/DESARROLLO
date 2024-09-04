const express = require('express');
const router = express.Router();
const ventasController = require('../../controllers/VentasController');


router.post('/', ventasController.createVenta);


router.get('/', ventasController.getAllVentas);


router.get('/:id', ventasController.getVentaById);


router.delete('/:id', ventasController.deleteVenta);

module.exports = router;
