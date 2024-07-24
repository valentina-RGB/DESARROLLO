const { request, response } = require('express');
const insumoService = require('../services/insumosServices');

const getInsumos = (req = request, res = response) => {
    insumoService.getInsumos(req, res);
};

const getInsumoByID = async (req = request, res = response) => {
    const insumoId = req.params.id;

    try {
        const oneInsumo = await insumoService.getInsumoByID(insumoId);
        return res.status(oneInsumo.status).json(oneInsumo.data || { message: oneInsumo.message });
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

const postInsumo = async (req = request, res = response) => {
    try {
        const insumo = req.body;
        const result = await insumoService.postInsumo(insumo);
        res.status(201).json({ message: 'Insumo created successfully', result });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
    }
};

const patchInsumo = async (req = request, res = response) => {
    try {
        const updatedInsumo = await insumoService.patchInsumo(req.params.id, req.body);
        res.status(200).json({ message: 'Insumo updated successfully', updatedInsumo });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
    }
};

const deleteInsumo = async (req = request, res = response) => {
    try {
        await insumoService.deleteInsumo(req.params.id);
        res.status(200).json({ message: 'Insumo deleted successfully' });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = {
    getInsumos,
    getInsumoByID,
    agregarEntrada,
    postInsumo,
    patchInsumo,
    deleteInsumo
};
