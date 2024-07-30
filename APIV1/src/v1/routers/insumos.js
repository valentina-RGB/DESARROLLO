const express = require('express');
const router = express.Router();
const insumosController = require('../controllers/insumos');

router.get('/', insumosController.getAllInsumos);

router.get('/:id', insumosController.getInsumoById);

router.post('/', insumosController.createInsumo);

router.put('/:id', insumosController.updateInsumo);

router.delete('/:id', insumosController.deleteInsumo);

router.post('/entrada', insumosController.agregarEntrada);

module.exports = router;
