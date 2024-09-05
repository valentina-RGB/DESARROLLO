const express = require('express');
const router = express.Router();
const historialEntradasController = require('../../controllers/HistoryEntrada');

// Obtener todo el historial de entradas
router.get('/', historialEntradasController.getAllEntradas);

// Obtener una entrada específica por ID
router.get('/:id', historialEntradasController.getEntradaById);

// Eliminar una entrada por ID
router.delete('/:id', historialEntradasController.deleteEntrada);

module.exports = router;
