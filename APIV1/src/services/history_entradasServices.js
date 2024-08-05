const { sequelize } = require('../../models'); 
const HistorialEntradas = require('../../models/HistorialEntradas');
const Insumos = require('../../models/insumos');

const addStockEntry = async (ID_insumo, cantidad) => {
  try {
    // Iniciar una transacción para asegurar consistencia de datos
    const transaction = await sequelize.transaction();

    try {
      // Crear la entrada en el historial de entradas
      const entry = await HistorialEntradas.create({
        ID_insumo,
        cantidad,
        fecha: new Date(),
      }, { transaction });

      // Obtener el insumo y actualizar su stock actual
      const insumo = await Insumos.findByPk(ID_insumo, { transaction });
      if (!insumo) {
        throw new Error('Insumo no encontrado.');
      }

      // Actualizar el stock actual del insumo
      insumo.stock_actual += cantidad;
      await insumo.save({ transaction });

      // Confirmar la transacción
      await transaction.commit();

      return entry;
    } catch (error) {
      // Revertir la transacción en caso de error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    throw new Error('Error al agregar la entrada de stock: ' + error.message);
  }
};

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

module.exports = { addStockEntry,
  getAllEntries,
  getEntriesByInsumoId,
 };