const express = require('express');
const {request , response} = require('express');
const ProductosService = require('../services/productsServices');

const 
    obtenerProductos = async (req, res) => {
        try{

        return await ProductosService.getProductos(res,req);  
       
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    obtenerProductosPorId = async (req, res) => {
        try {
            const {id} = req.params;
            const productos = await ProductosService.getProductosID(id);

            if(productos){
                res.status(200).json(productoss)      
            }else{
                res.status(404).json({message: 'Product not found' })
            }               
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    CrearProductos = async  (req = request, res= response) => {
        try {        
            const productos = await ProductosService.CreateProdutos(req.body);
            res.status(201).json({ message: 'Product created successfully', productos });
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    } ,

    ModificarProductos = async (req = request, res= response) =>{
        try {
            const { id } = req.params;
            const updatecategorie = await ProductosService.PatchProductos(id, req.body);

            if(updatecategorie){
                res.status(200).json({ message: 'Product updated successfully', updatecategorie });
            }
        }catch(error){
            res.status(400).json({ message: error.message });
            }     
    } ,

    EliminarProductos= async (req = request, res= response) =>{
        const { id } = req.params;
            try{
                const dato = await ProductosService.DeleteProductos(id);
                res.status(204).json({message: 'El dato fue eliminado', dato});
            }catch(error){
                const statusCode = error.status || 500;
                res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
            }      
    }

module.exports = {
   obtenerProductos,
   obtenerProductosPorId,
   CrearProductos,
   ModificarProductos,
   EliminarProductos
}