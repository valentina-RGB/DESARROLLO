const express = require('express');
const {request , response} = require('express');
const productService = require('../services/productsServices');

const 
    
    getProduct = (req= req, res= response) =>{
        const allproduct = productService.getProduct(req,res)
    } ,  
    
    getProductID = async (req = request, res= response) =>{  
        const productId = req.params.id;

        try {
            const oneproduct = await   productService.getProductID(productId)
            return res.status(oneproduct.status).json(oneproduct.data || { message: oneproduct.message });
          } catch (error) {
            return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
          }
    } ,  

    postProduct = async  (req = request, res= response) => {
        try {
            const product = req.body;
            const result = await productService.postProduct(product); // Suponiendo que `postProductService` es tu función de servicio
            res.status(201).json({ message: 'Product created successfully', result });
        } catch (error) {
            // Verifica que el error tenga un código de estado válido o usa un código por defecto
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    
    } ,

    patchProduct = async (req = request, res= response) =>{
        try {
            const productId = req.params.id;
            const product = req.body; 
            const updateproduct = await productService.patchProduct(productId, product);

            res.status(200).json({ message: 'Product updated successfully',updateproduct });
            
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    } ,

    deleteProduct = async (req = request, res= response) =>{
        try {
            const productId = req.params.id; 
            const result = await productService.deleteProduct(productId);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        } 
    }


module.exports = {
    getProduct,
    getProductID,
    postProduct,
    patchProduct,
    deleteProduct
}