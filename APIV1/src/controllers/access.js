const express = require('express');
const {request , response} = require('express');
const accessService = require('../services/accessService');

const 
    obtenerAcceso = async (req, res) => {
        try{

        return await accessService.getaccess(res,req);  
       
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    obtenerAccesoPorId = async (req, res) => {
        try {
            const {id} = req.params;
            const acceso = await accessService.getAccessID(id);

            if(acceso){
                res.status(200).json(acceso)      
            }else{
                res.status(404).json({message: 'acceso not found' })
            }               
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    CrearAcceso = async  (req = request, res= response) => {
        try {        
            const acceso = await accessService.CreateAccess(req.body);
            res.status(201).json({ message: 'access created successfully', acceso });
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    } ,

    ModificarAcceso = async (req = request, res= response) =>{
        try {
            const { id } = req.params;
            const updateaccess = await accessService.Patchaccess(id, req.body);

            if(updateaccess){
                res.status(200).json({ message: 'Access updated successfully', updateaccess });
            }
        }catch(error){
            res.status(400).json({ message: error.message });
            }     
    } ,

    eliminarAcceso= async (req = request, res= response) =>{
        const { id } = req.params;
            try{
                const dato = await accessService.Deleteaccess(id);
                res.status(204).json({message: 'El dato fue eliminado', dato});
            }catch(error){
                const statusCode = error.status || 500;
                res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
            }      
    }

module.exports = {
   obtenerAcceso,  
   obtenerAccesoPorId,
   CrearAcceso,
   ModificarAcceso,
   eliminarAcceso
}