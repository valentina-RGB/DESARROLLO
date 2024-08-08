const express = require('express');
const router = express.Router();
const controllerPermise_users = require('../../controllers/Permise_users');

router
    .get('/', controllerPermise_users.obtenerPermiso_usuarios)
    .get('/:id', controllerPermise_users.obtenerPermiso_usuariosPorId)
    .post('/', controllerPermise_users.crearPermiso_usuarios)
    .patch('/:id', controllerPermise_users.modificarPermiso_usuarios)
    .delete('/:id', controllerPermise_users.eliminarPermiso_usuarios)


module.exports = router;
