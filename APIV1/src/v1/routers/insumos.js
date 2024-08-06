// routes/insumos.js
const express = require('express');
const router = express.Router();
const InsumosController = require('../../controllers/insumos');
const { validateUpdateInsumo, validateInsumos } = require('../../validation/validations_ISE');

router.get('/', InsumosController.obtenerInsumos);
router.get('/:id', InsumosController.obtenerInsumoPorId);
router.post('/', validateInsumos ,InsumosController.crearInsumo);
router.put('/:id', validateUpdateInsumo, InsumosController.actualizarInsumo);
router.delete('/:id', InsumosController.eliminarInsumo);
router.post('/:id/entradas', InsumosController.agregarEntrada);

module.exports = router;
