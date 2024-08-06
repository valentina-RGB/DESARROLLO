const express = require('express');
const router = express.Router();
const controllerCategories = require('../../controllers/categories');
const {validateCategoria } = require('../../validation/validations_PCP');

router
    .get('/', controllerCategories.obtenercategorias)
    .get('/:id', controllerCategories.obtenerCategoriasPorId)
    .post('/', validateCategoria, controllerCategories.CrearCategorias)
    .put('/:id', controllerCategories.ModificarCategorias)
    .delete('/:id', controllerCategories.eliminarCategorias)


module.exports = router;
