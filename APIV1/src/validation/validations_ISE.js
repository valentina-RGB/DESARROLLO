const express = require('express');
const Joi = require('joi');

const createInsumosSchema = Joi.object({
    ID_tipo_insumo: Joi.number().integer().positive().required(),
    descripcion_insumo: Joi.string().max(50).required(),
    estado_insumo: Joi.string().valid('D', 'A').default('D').required(),
    precio: Joi.number().positive().optional()
});

const updateInsumosSchema = Joi.object({
    ID_tipo_insumo: Joi.number().integer().positive().optional(),
    descripcion_insumo: Joi.string().max(50).optional(),
    estado_insumo: Joi.string().valid('D', 'A').optional(),
    precio: Joi.number().positive().optional()
});

function validateInsumos(req, res, next) {
    const { error } = createInsumosSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

function validateUpdateInsumo(req, res, next) {
    const { error } = updateInsumosSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}

//Tipo_INSUMO
const createTipoInsumoSchema = Joi.object({
    descripcion_tipo: Joi.string().max(255).required(),
  });
  
  const updateTipoInsumoSchema = Joi.object({
    descripcion_tipo: Joi.string().max(255).optional(),
  });
  
  function validateCreateTipoInsumo(req, res, next) {
    const { error } = createTipoInsumoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }
  
  function validateUpdateTipoInsumo(req, res, next) {
    const { error } = updateTipoInsumoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }
  

module.exports = {
    validateInsumos,
    validateUpdateInsumo,
    validateCreateTipoInsumo,
  validateUpdateTipoInsumo
}
