const express = require('express');
const {request , response} = require('express');
const detalleService = require('../services/Producto_pedidos');



const 
    obtenerpedidos = async (req, res= response) => {
        try{
        const pedidos = await detalleService.CrearDetalle()  
        res.status(200).json(pedidos); 

        }catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    
    CrearDetalle = async  (req = request, res= response) => {
        const pedido =req.body.ID_pedidos;
        const producto = req.body.ID_productos;
        const cantidad = req.body.cantidad;
    
        try {        
            const estados = await detalleService.agregarDetalle(pedido, producto, cantidad);
            // res.status(201).json({ messaestados });
            res.status(201).json(estados); 
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    },

    EliminarDetalle = async (req = request, res= response) =>{
        const { id } = req.params;
            try{
                const dato = await detalleService.DeleteDetalles(id);
                res.status(204).json({message: 'El dato fue eliminado', dato});
            }catch(error){
                const statusCode = error.status || 500;
                res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
            }      
    }

module.exports = {
    obtenerpedidos,
    CrearDetalle,
    EliminarDetalle
}