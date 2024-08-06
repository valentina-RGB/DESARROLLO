const express = require('express');
const Joi = require('joi');

const categoriaSchema = Joi.object({
    descripcion: Joi.string()
      .max(100)
      .required()
      .pattern(/^[a-zA-Z\s]+$/)  
      .messages({
        'string.pattern.base': 'Descripción debe contener solo letras y espacios.'
      }),
    estado_categoria: Joi.string()
      .length(1)
      .valid('A', 'I')
      .default('A'),
    imagen: Joi.string().max(100).allow(null, '')
  });


const estadoPedidoSchema = Joi.object({
    descripcion: Joi.string()
      .max(100)
      .allow(null, '')
      .pattern(/^[a-zA-Z0-9\s]*$/)  // Letras, números y espacios permitidos, vacío permitido
      .messages({
        'string.pattern.base': 'Descripción debe contener solo letras, números y espacios.'
      })
});


const productoSchema = Joi.object({
  descripcion: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'La descripción debe ser una cadena de texto.',
      'string.max': 'La descripción debe tener un máximo de 100 caracteres.',
      'any.required': 'La descripción es obligatoria.'
    }),
  precio_neto: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El precio neto debe ser un número.',
      'number.positive': 'El precio neto debe ser un número positivo.',
      'number.precision': 'El precio neto debe tener un máximo de dos decimales.',
      'any.required': 'El precio neto es obligatorio.'
    }),
  estado_producto: Joi.string()
    .valid('Disponible', 'No Disponible')
    .default('Disponible')
    .messages({
      'string.base': 'El estado del producto debe ser una cadena de texto.',
      'any.only': 'El estado del producto debe ser "Disponible" o "No Disponible".'
    }),
  ID_tipo_productos: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .messages({
      'number.base': 'El ID del tipo de producto debe ser un número entero.',
      'number.integer': 'El ID del tipo de producto debe ser un número entero positivo.',
      'number.positive': 'El ID del tipo de producto debe ser un número entero positivo.'
    }),
  ID_categoria: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .messages({
      'number.base': 'El ID de la categoría debe ser un número entero.',
      'number.integer': 'El ID de la categoría debe ser un número entero positivo.',
      'number.positive': 'El ID de la categoría debe ser un número entero positivo.'
    }),
  imagen: Joi.string()
    .max(100)
    .allow(null)
    .messages({
      'string.base': 'La imagen debe ser una cadena de texto.',
      'string.max': 'La imagen debe tener un máximo de 100 caracteres.'
    })
});




// Middleware para validar la solicitud
function validateProducto(req, res, next) {
  const { error } = productoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}



// Middleware para validar la solicitud
function validateEstado(req, res, next) {
    const { error } = estadoPedidoSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
}


// Middleware para validar la solicitud
function validateCategoria(req, res, next) {
    const { error } = categoriaSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  }



module.exports = {
    validateCategoria,
    validateEstado,
    validateProducto
}