// controllers/InsumosController.js
const db = require('../../models');

const Insumos = db.Insumos;
const HistorialStock = db.HistorialStock;

const obtenerInsumos = async (req, res) => {
  try {
    const insumos = await Insumos.findAll();
    res.status(200).json(insumos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerInsumoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const insumo = await Insumos.findByPk(id);
    if (insumo) {
      res.status(200).json(insumo);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const crearInsumo = async (req, res) => {
  try {
    const insumo = await Insumos.create(req.body);
    res.status(201).json(insumo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarInsumo = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Insumos.update(req.body, {
      where: { ID_insumo: id },
    });
    if (updated) {
      const updatedInsumo = await Insumos.findByPk(id);
      res.status(200).json(updatedInsumo);
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarInsumo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Insumos.destroy({
      where: { ID_insumo: id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Insumo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const agregarAdicion = async (req, res) => {
  const { id } = req.params; // ID del insumo
  try {
    const insumo = await Insumos.findByPk(id);
    if (!insumo) {
      return res.status(404).json({ message: 'Insumo no encontrado' });
    }
    const { cantidad, descripcion } = req.body;

    // Registrar la entrada en el historial
    await HistorialStock.create({
      ID_insumo: id,
      cantidad,
      descripcion,
      fecha: new Date(),
    });

    // Opcional: Si tienes una tabla Stock_insumos, aquí actualizarías el stock_actual
    // por ejemplo: await StockInsumos.increment('stock_actual', { by: cantidad, where: { ID_insumo: id } });

    res.status(201).json({ message: 'Adición registrada y stock actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerInsumos,
  obtenerInsumoPorId,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
  agregarAdicion,
};
