// routes/insumos.js
const express = require('express');
const router = express.Router();
const InsumosController = require('../../controllers/insumos');

router.get('/', InsumosController.obtenerInsumos);
router.get('/:id', InsumosController.obtenerInsumoPorId);
router.post('/', InsumosController.crearInsumo);
router.put('/:id', InsumosController.actualizarInsumo);
router.delete('/:id', InsumosController.eliminarInsumo);
router.post('/:id/adiciones', InsumosController.agregarAdicion);

module.exports = router;
