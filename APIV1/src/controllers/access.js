const express = require('express');
const {request , response} = require('express');
const accessService = require('../services/accessServices');

const 
    
    getAccess = (req= req, res= response) =>{
        const allaccesss = accessService.getAccess(req,res)
    } ,  
    
    getAccessID = async (req = request, res= response) =>{  
        const accessId = req.params.id;

        try {
            const oneaccess = await   accessService.getAccessID(accessId)
            return res.status(oneaccess.status).json(oneaccess.data || { message: oneaccess.message });
          } catch (error) {
            return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
          }
    } ,  

    postAccess = async  (req = request, res= response) => {
        try {
            const access = req.body;
            const result = await accessService.postAccess(access); // Suponiendo que `postaccessService` es tu función de servicio
            res.status(201).json({ message: 'access created successfully', result });
        } catch (error) {
            // Verifica que el error tenga un código de estado válido o usa un código por defecto
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    
    } ,

    patchAccess = async (req = request, res= response) =>{
        try {
            const accessId = req.params.id;
            const access = req.body; 
            const updateaccess = await accessService.patchAccess(accessId,access);

            res.status(200).json({ message: 'access updated successfully',updateaccess });
            
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    } ,

    deleteAccess = async (req = request, res= response) =>{
        try {
            const accessId = req.params.id; 
            const result = await accessService.deleteAccess(accessId);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'access not found' });
            }
            
            res.status(200).json({ message: 'access deleted successfully' });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        } 
    }


module.exports = {
   getAccess,
   getAccessID,
   postAccess,
   patchAccess,
   deleteAccess
}