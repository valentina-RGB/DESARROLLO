const express = require('express');
const router = express.Router();
const controllerClient = require('../../controllers/clients');

router
    .get('/client', controllerClient.getClient)
    .get('/client/:id', controllerClient.getClientID)
    .post ('/client', controllerClient.postClient )
    .patch('/client/:id', controllerClient.patchClient)
    .delete('/client/:id', controllerClient.deleteClient)


    module.exports = router;
