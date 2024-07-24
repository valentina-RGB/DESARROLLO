const express = require('express');
const router = express.Router();
const controllerCategories = require('../../controllers/categories');

router
    .get('/categories', controllerCategories.getCategorie)
    .get('/categories/:id', controllerCategories.getCategorieID)
    .post('/categories', controllerCategories.postCategorie)
    .patch('/categories/:id', controllerCategories.patchCategorie)
    .delete('/categories/:id', controllerCategories.deleteCategorie)


module.exports = router;
