const VentaService = require('../services/VentaService');

const createVenta = async (req, res) => {
  try {
    const ventaData = req.body;
    const venta = await VentaService.createVenta(ventaData);
    return res.status(201).json(venta);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllVentas = async (req, res) => {
  try {
    const ventas = await VentaService.getAllVentas();
    return res.status(200).json(ventas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getVentaById = async (req, res) => {
  try {
    const { ID_venta } = req.params;
    const venta = await VentaService.getVentaById(ID_venta);
    return res.status(200).json(venta);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
};

const updateVenta = async (req, res) => {
  try {
    const { ID_venta } = req.params;
    const updateData = req.body;
    const updatedVenta = await VentaService.updateVenta(ID_venta, updateData);
    return res.status(200).json(updatedVenta);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
};

const deleteVenta = async (req, res) => {
  try {
    const { ID_venta } = req.params;
    const result = await VentaService.deleteVenta(ID_venta);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { createVenta, getAllVentas, getVentaById, updateVenta, deleteVenta };