const express = require('express');
const router = express.Router();
const controllerClient = require('../../controllers/clients');

router
    .get('/clients', controllerClient.getClient)
    .get('/clients/:id', controllerClient.getClientID)
    .post ('/clients', controllerClient.postClient )
    .patch('/clients/:id', controllerClient.patchClient)
    .delete('/clients/:id', controllerClient.deleteClient)


    module.exports = router;
