const express = require('express');
const router = express.Router();
const Historial_entradasController = require('../../controllers/HistoryEntrada');

router.post('/historial_stock', Historial_entradasController.addStockEntry);

module.exports = router;