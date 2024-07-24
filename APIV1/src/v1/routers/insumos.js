const express = require('express');
const router = express.Router();
const controllerInsumo = require('../../controllers/insumos');

router
    .get('/insumos', controllerInsumo.getInsumos)
    .get('/insumos/:id', controllerInsumo.getInsumoByID)
    .post('/entrada', controllerInsumo.agregarEntrada)
    .post('/insumos', controllerInsumo.postInsumo)
    .patch('/insumos/:id', controllerInsumo.patchInsumo)
    .delete('/insumos/:id', controllerInsumo.deleteInsumo);
    

module.exports = router;
