const express = require('express');
const router = express.Router();
const controllerAccess = require('../../controllers/access');

router
    .get('/Access', controllerAccess.getAccess)
    .get('/Access/:id', controllerAccess.getAccessID)
    .post('/Access', controllerAccess.postAccess)
    .patch('/Access/:id', controllerAccess.patchAccess)
    .delete('/Access/:id', controllerAccess.deleteAccess)


module.exports = router;
