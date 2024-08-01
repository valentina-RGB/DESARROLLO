const express = require('express');
const {request , response} = require('express');
const rolesService = require('../services/rolesServices');

const 
    
    getRoles = (req= req, res= response) =>{
        const allroless = rolesService.getRoles(req,res)
    } ,  
    
    getRolesID = async (req = request, res= response) =>{  
        const rolesId = req.params.id;

        try {
            const oneroles = await   rolesService.getRolesID(rolesId)
            return res.status(oneroles.status).json(oneroles.data || { message: oneroles.message });
          } catch (error) {
            return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
          }
    } ,  

    postRoles = async  (req = request, res= response) => {
        try {
            const roles = req.body;
            const result = await rolesService.postRoles(roles); // Suponiendo que `postrolesService` es tu función de servicio
            res.status(201).json({ message: 'roles created successfully', result });
        } catch (error) {
            // Verifica que el error tenga un código de estado válido o usa un código por defecto
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    
    } ,

    patchRoles = async (req = request, res= response) =>{
        try {
            const rolesId = req.params.id;
            const roles = req.body; 
            const updateroles = await rolesService.patchRoles(rolesId,roles);

            res.status(200).json({ message: 'roles updated successfully',updateroles });
            
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    } ,

    deleteRoles = async (req = request, res= response) =>{
        try {
            const rolesId = req.params.id; 
            const result = await rolesService.deleteRoles(rolesId);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'roles not found' });
            }
            
            res.status(200).json({ message: 'roles deleted successfully' });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        } 
    }


module.exports = {
   getRoles,
   getRolesID,
   postRoles,
   patchRoles,
   deleteRoles
}