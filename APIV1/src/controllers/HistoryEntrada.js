const HistorialEntradas = require('../../models/HistorialEntradas');

const getAllEntries = async () => {
  try {
    const entries = await HistorialEntradas.findAll();
    return entries;
  } catch (error) {
    throw new Error('Error al obtener el historial de entradas: ' + error.message);
  }
};

const getEntriesByInsumoId = async (ID_insumo) => {
  try {
    const entries = await HistorialEntradas.findAll({
      where: { ID_insumo }
    });
    return entries;
  } catch (error) {
    throw new Error('Error al obtener el historial de entradas para el insumo: ' + error.message);
  }
};

module.exports = { getAllEntries, getEntriesByInsumoId };