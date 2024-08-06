const { addStockEntry, getAllEntries, getEntriesByInsumoId } = require('../services/history_entradasServices');

const addStockEntryHandler = async (req, res) => {
  const { ID_insumo, cantidad } = req.body;
  try {
    const entry = await addStockEntry(ID_insumo, cantidad);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllEntriesHandler = async (req, res) => {
  try {
    const entries = await getAllEntries();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEntriesByInsumoIdHandler = async (req, res) => {
  const { ID_insumo } = req.params;
  try {
    const entries = await getEntriesByInsumoId(ID_insumo);
    if (entries.length === 0) {
      res.status(404).json({ message: 'No se encontraron entradas para el insumo especificado.' });
    } else {
      res.status(200).json(entries);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEntriesHandler,
  getEntriesByInsumoIdHandler,
  addStockEntryHandler
};