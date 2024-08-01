const express = require('express');
const router = express.Router();
const controllerRoles = require('../../controllers/Roles');

router
    .get('/Roles', controllerRoles.getRol)
    .get('/Roles/:id', controllerRoles.getRolID)
    .post('/Roles', controllerRoles.postRol)
    .patch('/Roles/:id', controllerRoles.patchRol)
    .delete('/Roles/:id', controllerRoles.deleteRol)


module.exports = router;
