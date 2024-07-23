const express = require('express');
const router = express.Router();
const controllerProduct = require('../../controllers/products');

router
    .get('/product', controllerProduct.getProduct)
    .get('/product/:id', controllerProduct.getProductID)
    .post ('/product', controllerProduct.postProduct )
    .patch('/product/:id', controllerProduct.patchProduct)
    .delete('/product/:id', controllerProduct.deleteProduct)


    module.exports = router;
