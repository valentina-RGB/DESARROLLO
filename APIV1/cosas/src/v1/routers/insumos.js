// routes/insumos.js
const express = require('express');
const router = express.Router();
const InsumosController = require('../../controllers/insumos');
const { validateInsumosUptate, validateInsumos } = require('../../validation/validations_ISE');

router.get('/', InsumosController.obtenerInsumos);
router.get('/:id', InsumosController.obtenerInsumoPorId);
router.post('/', validateInsumos ,InsumosController.crearInsumo);
router.put('/:id', validateInsumosUptate, InsumosController.actualizarInsumo);
router.delete('/:id', InsumosController.eliminarInsumo);
router.post('/:id/adiciones', InsumosController.agregarAdicion);

module.exports = router;
