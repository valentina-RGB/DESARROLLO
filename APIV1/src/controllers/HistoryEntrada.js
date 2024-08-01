const HistorialStockService = require('../services/history_entradasServices');

const addStockEntry = async (req, res) => {
  try {
    const { ID_insumo, cantidad } = req.body;
    const entry = await HistorialStockService.addStockEntry(ID_insumo, cantidad);
    return res.status(201).json(entry);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { addStockEntry };
