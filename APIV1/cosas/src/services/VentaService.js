const Venta = require('../models/Venta');

const createVenta = async (ventaData) => {
  try {
    const venta = await Venta.create(ventaData);
    return venta;
  } catch (error) {
    throw error;
  }
};

const getAllVentas = async () => {
  try {
    const ventas = await Venta.findAll();
    return ventas;
  } catch (error) {
    throw error;
  }
};

const getVentaById = async (ID_venta) => {
  try {
    const venta = await Venta.findByPk(ID_venta);
    if (!venta) {
      throw { status: 404, message: 'Venta not found' };
    }
    return venta;
  } catch (error) {
    throw error;
  }
};

const updateVenta = async (ID_venta, updateData) => {
  try {
    const venta = await Venta.findByPk(ID_venta);
    if (!venta) {
      throw { status: 404, message: 'Venta not found' };
    }
    await venta.update(updateData);
    return venta;
  } catch (error) {
    throw error;
  }
};

const deleteVenta = async (ID_venta) => {
  try {
    const venta = await Venta.findByPk(ID_venta);
    if (!venta) {
      throw { status: 404, message: 'Venta not found' };
    }
    await venta.destroy();
    return { message: 'Venta deleted successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = { createVenta, getAllVentas, getVentaById, updateVenta, deleteVenta };