const express = require('express');
const router = express.Router();
const { 
    getAllEntriesHandler, 
    getEntriesByInsumoIdHandler, 
    addStockEntryHandler 
  }= require('../../controllers/HistoryEntrada');

router.post('/historial_stock', addStockEntryHandler);
router.get('/entries', getAllEntriesHandler);
router.get('/entries/:ID_insumo', getEntriesByInsumoIdHandler);

module.exports = router;