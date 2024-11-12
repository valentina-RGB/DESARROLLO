const express = require('express');
const router = express.Router();
const controllerAccess = require('../../controllers/autenticacion');

router
    // .get('/', controllerAccess.obtenerAcceso)
    // .get('/:id', controllerAccess.obtenerAccesoPorId)
    .post('/login', controllerAccess.authenticateToken, controllerAccess.Iniciar_sesion)
    .post('/signup', controllerAccess.authenticateToken,
        // body('username').isLength({ min: 5 }),
        // body('password').isLength({ min: 8 }),
        controllerAccess.registrar
      
    )
   
    // .patch('/:id', controllerAccess.ModificarAcceso)
    // .delete('/:id', controllerAccess.eliminarAcceso)



module.exports = router;
