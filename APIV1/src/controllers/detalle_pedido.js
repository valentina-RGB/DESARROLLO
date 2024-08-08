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
    }



module.exports = {
    obtenerpedidos
}