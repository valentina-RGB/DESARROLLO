const insumosService = require('../services/insumosServices');

const getInsumoById = async (req, res) => {
    const insumoId = req.params.id;

    try {
        const insumo = await insumosService.getInsumoById(insumoId);
        return res.status(insumo.status).json(insumo.data || { message: insumo.message });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getAllInsumos = async (req, res) => {
    try {
        const insumos = await insumosService.getAllInsumos();
        return res.status(insumos.status).json(insumos.data || { message: insumos.message });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const createInsumo = async (req, res) => {
    try {
        const insumoData = req.body;
        const result = await insumosService.createInsumo(insumoData);
        return res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const updateInsumo = async (req, res) => {
    const insumoId = req.params.id;

    try {
        const insumoData = req.body;
        const result = await insumosService.updateInsumo(insumoId, insumoData);
        return res.status(result.status).json(result.data || { message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteInsumo = async (req, res) => {
    const insumoId = req.params.id;

    try {
        const result = await insumosService.deleteInsumo(insumoId);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const agregarEntrada = async (req, res) => {
    try {
        const entrada = req.body;
        const result = await insumosService.agregarEntrada(entrada);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = {
    getInsumoById,
    getAllInsumos,
    createInsumo,
    updateInsumo,
    deleteInsumo,
    agregarEntrada
};
