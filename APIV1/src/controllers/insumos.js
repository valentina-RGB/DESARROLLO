// controllers/InsumosController.js
const { sequelize } = require('../../models'); 
const db = require('../../models');


const Insumos = db.Insumos;
const StockInsumos = db.StockInsumos;
const HistorialEntradas = db.HistorialEntradas

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
    //await StockInsumos.increment('stock_actual', { by: cantidad, where: { ID_insumo: id } });

    res.status(201).json({ message: 'Entrada registrada y stock actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//NO FUNCIONA
// const agregarEntrada = async (entrada) => {
//   const { ID_insumo, cantidad } = entrada;

//   // Iniciar una transacción para asegurar consistencia de datos
//   const transaction = await sequelize.transaction();

//   try {
//     // Verificar si el insumo existe
//     const insumo = await Insumos.findByPk(ID_insumo, { transaction });
//     if (!insumo) {
//       throw new Error('Insumo no encontrado.');
//     }

//     // Crear la entrada en el historial de entradas
//     const entry = await HistorialEntradas.create({
//       ID_insumo,
//       cantidad,
//       fecha: new Date(),
//     }, { transaction });

//     // Actualizar el stock del insumo
//     insumo.stock_actual = (insumo.stock_actual || 0) + cantidad;
//     await insumo.save({ transaction });

//     // Confirmar la transacción
//     await transaction.commit();

//     return { status: 200, message: 'Entrada agregada y stock actualizado exitosamente.' };
//   } catch (error) {
//     // Revertir la transacción en caso de error
//     await transaction.rollback();
//     throw new Error('Error al agregar la entrada: ' + error.message);
//   }
// };

module.exports = { agregarEntrada };



module.exports = {
  obtenerInsumos,
  obtenerInsumoPorId,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
  agregarEntrada,
};
