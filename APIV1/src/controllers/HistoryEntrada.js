const { HistorialEntradas, Insumos } = require('../../models');

// Obtener todas las entradas del historial
const getAllEntradas = async (req, res) => {
  try {
    const entradas = await HistorialEntradas.findAll({
      include: [{ model: Insumos, attributes: ['descripcion_insumo'] }]
    });
    res.status(200).json(entradas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de entradas' });
  }
};

// Obtener una entrada por ID
const getEntradaById = async (req, res) => {
  const { id } = req.params;
  try {
    const entrada = await HistorialEntradas.findByPk(id, {
      include: [{ model: Insumos, attributes: ['descripcion_insumo'] }]
    });
    if (!entrada) {
      return res.status(404).json({ error: 'Entrada no encontrada' });
    }
    res.status(200).json(entrada);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la entrada' });
  }
};

// Eliminar una entrada por ID
const deleteEntrada = async (req, res) => {
  const { id } = req.params;
  try {
    const entrada = await HistorialEntradas.findByPk(id);
    if (!entrada) {
      return res.status(404).json({ error: 'Entrada no encontrada' });
    }

    await entrada.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la entrada' });
  }
};

module.exports = {
  getAllEntradas,
  getEntradaById,
  deleteEntrada,
};
