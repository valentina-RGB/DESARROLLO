const express = require('express');
const {request , response} = require('express');
const permise_usersService = require('../services/permise_usersService');

const 
    obtenerPermiso_usuarios = async (req, res) => {
        try{

        return await permise_usersService.getPermise_users(res,req);  
       
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    obtenerPermiso_usuariosPorId = async (req, res) => {
        try {
            const {id} = req.params;
            const permiso_usuarios = await permise_usersService.getPermise_usersID(id);

            if(permiso_usuarios){
                res.status(200).json(permiso_usuarios)      
            }else{
                res.status(404).json({message: 'permiso_usuarios not found' })
            }               
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    crearPermiso_usuarios = async  (req = request, res= response) => {
        try {        
            const permiso_usuarios = await permise_usersService.CreatePermise_users(req.body);
            res.status(201).json({ message: 'permise_users created successfully', permiso_usuarios });
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    } ,

    modificarPermiso_usuarios = async (req = request, res= response) =>{
        try {
            const { id } = req.params;
            const updatepermise_users = await permise_usersService.PatchPermise_users(id, req.body);

            if(updatepermise_users){
                res.status(200).json({ message: 'permise_users updated successfully', updatePermise_users });
            }
        }catch(error){
            res.status(400).json({ message: error.message });
            }     
    } ,

    eliminarPermiso_usuarios= async (req = request, res= response) =>{
        const { id } = req.params;
            try{
                const dato = await permise_usersService.DeletePermise_users(id);
                res.status(204).json({message: 'El permiso_usuarios fue eliminado', dato});
            }catch(error){
                const statusCode = error.status || 500;
                res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
            }      
    }

module.exports = {
   obtenerPermiso_usuarios,  
   obtenerPermiso_usuariosPorId,
   crearPermiso_usuarios,
   modificarPermiso_usuarios,
   eliminarPermiso_usuarios
}