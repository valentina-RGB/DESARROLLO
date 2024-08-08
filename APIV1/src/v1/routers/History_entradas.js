const express = require('express');
const router = express.Router();
const { getAllEntries, getEntriesByInsumoId } = require('../../controllers/HistoryEntrada');

// Ruta para obtener todas las entradas
router.get('/entradas', async (req, res) => {
  try {
    const entries = await getAllEntries();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener entradas por ID de insumo
router.get('/entradas/:ID_insumo', async (req, res) => {
  const { ID_insumo } = req.params;
  try {
    const entries = await getEntriesByInsumoId(ID_insumo);
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;