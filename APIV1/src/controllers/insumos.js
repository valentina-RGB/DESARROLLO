// controllers/InsumosController.js
const db = require('../../models');

const Insumos = db.Insumos;
const StockInsumos = db.StockInsumos;
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
  const transaction = await db.sequelize.transaction(); // Iniciar una transacción
  try {
    const insumo = await Insumos.create(req.body, { transaction });

    // Crear un registro en Stock_insumos para el nuevo insumo
    await StockInsumos.create(
      {
        stock_min: 0, 
        stock_max: 100, 
        stock_actual: 0, 
        ID_insumo: insumo.ID_insumo,
        medida: 'unidad', 
        unidad: 0,
      },
      { transaction }
    );

    await transaction.commit(); 
    res.status(201).json(insumo);
  } catch (error) {
    await transaction.rollback(); 
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
  const { id } = req.params; 
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

    // Actualizar el stock_actual en Stock_insumos
    await StockInsumos.increment('stock_actual', { by: cantidad, where: { ID_insumo: id } });

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
