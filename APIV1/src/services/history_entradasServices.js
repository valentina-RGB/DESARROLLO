const HistorialStock = require('../models/HistorialStock');

const addStockEntry = async (ID_insumo, cantidad) => {
  try {
    const entry = await HistorialStock.create({
      ID_insumo,
      cantidad,
      fecha: new Date(),
    });
    return entry;
  } catch (error) {
    throw error;
  }
};

module.exports = { addStockEntry };