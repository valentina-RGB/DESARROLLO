const express = require('express');
const Joi = require('joi');

const createStockInsumoSchema = Joi.object({
    stock_min: Joi.number().integer().min(1).required(),
    stock_max: Joi.number().integer().greater(Joi.ref('stock_min')).required(),
    stock_actual: Joi.number().integer().min(1).optional(),
    ID_porcion: Joi.number().integer().positive().optional(),
    medida: Joi.string().max(30).optional(),
    unidad: Joi.number().integer().positive().optional(),
    sabor_helado: Joi.string().max(50).optional()
});

const updateStockInsumoSchema = Joi.object({
    stock_min: Joi.number().integer().min(0).optional(),
    stock_max: Joi.number().integer().greater(Joi.ref('stock_min')).optional(),
    stock_actual: Joi.number().integer().min(0).optional(),
    ID_porcion: Joi.number().integer().positive().optional(),
    medida: Joi.string().max(30).optional(),
    unidad: Joi.number().integer().positive().optional(),
    sabor_helado: Joi.string().max(50).optional()
});


function validateInsumos(req, res, next) {
    const { error } = createStockInsumoSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
}
function validateInsumosUptate(req, res, next) {
    const { error } = updateStockInsumoSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
}


module.exports = {
    validateInsumos,
    validateInsumosUptate
}