// controllers/InsumosController.js
const { sequelize } = require('../../models'); 
const db = require('../../models');
const { validateInsumos, validateUpdateInsumo } = require('../validation/validations_ISE');


const Insumos = db.Insumos;
const StockInsumos = db.StockInsumos;
const HistorialEntradas = db.HistorialEntradas

const obtenerInsumos = async (req, res) => {
  try {
    const insumos = await Insumos.findAll({
      include: [
        {
          model: StockInsumos,
          as: 'stock',
          attributes: ['stock_actual']
        }
      ]
    });
    console.log(JSON.stringify(insumos, null, 2)); 
    res.json(insumos);
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
  const transaction = await db.sequelize.transaction();
  try {
    const {
      ID_tipo_insumo,
      descripcion_insumo,
      estado_insumo, // Opcional: Puedes incluir este campo si es necesario
      precio,
      stock_min,
      stock_max,
      stock_actual,
      medida,
      unidad
    } = req.body;

    if (!ID_tipo_insumo || !descripcion_insumo) {
      await transaction.rollback();
      return res.status(400).json({ message: 'ID_tipo_insumo y descripcion_insumo son campos obligatorios.' });
    }
    const insumo = await Insumos.create({
      ID_tipo_insumo,
      descripcion_insumo,
      estado_insumo, 
      precio
    }, { transaction });
  
    await StockInsumos.create({
      stock_min: stock_min || 0,
      stock_max: stock_max || 100,
      stock_actual: stock_actual || 0,
      ID_insumo: insumo.ID_insumo,
      medida: medida || 'unidad',
      unidad: unidad || 0
    }, { transaction });

    await transaction.commit(); 
    res.status(201).json(insumo);
  } catch (error) {
    await transaction.rollback(); 
    res.status(400).json({ message: error.message });
  }
};

const actualizarInsumo = async (req, res) => {
  console.log('Datos recibidos:', req.body);
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
      console.error('Error al actualizar el insumo:', error);
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


const agregarEntrada = async (req, res) => {
  const { id } = req.params;
  try {
    const insumo = await Insumos.findByPk(id);
    if (!insumo) {
      return res.status(404).json({ message: 'Insumo no encontrado' });
    }
    const { cantidad, descripcion } = req.body;

    // Registrar la entrada en el historial de entradas
    await HistorialEntradas.create({
      ID_insumo: id,
      cantidad,
      descripcion,
      fecha: new Date(),
    });

    // Actualizar el stock_actual en Stock_insumos
    await StockInsumos.increment('stock_actual', { by: cantidad, where: { ID_insumo: id } });

    res.status(201).json({ message: 'Entrada registrada y stock actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getInsumoDetails = async (req, res) => {
  try {
      const { id } = req.params;
      const insumo = await Insumos.findOne({
          where: { ID_insumo: id },
          include: [
              { model: StockInsumos, as: 'stock' }
          ]
      });

      if (!insumo) {
          return res.status(404).json({ error: 'Insumo no encontrado' });
      }

      res.json(insumo);
  } catch (error) {
      console.error('Error al obtener el detalle del insumo:', error);
      res.status(500).json({ error: 'Error al obtener el detalle del insumo' });
  }
};




module.exports = {
  obtenerInsumos,
  obtenerInsumoPorId,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
  agregarEntrada,
  getInsumoDetails
};
