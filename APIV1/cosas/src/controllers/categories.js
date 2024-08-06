const express = require('express');
const {request , response} = require('express');
const categorieService = require('../services/categoriesServices');

const 
    obtenercategorias = async (req, res) => {
        try{

        return await categorieService.getCategorie(res,req);  
       
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    obtenerCategoriasPorId = async (req, res) => {
        try {
            const {id} = req.params;
            const categorias = await categorieService.getCategoriesID(id);

            if(categorias){
                res.status(200).json(categorias)      
            }else{
                res.status(404).json({message: 'Categorias not found' })
            }               
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    CrearCategorias = async  (req = request, res= response) => {
        try {        
            const categorias = await categorieService.CreateCategories(req.body);
            res.status(201).json({ message: 'Categorie created successfully', categorias });
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    } ,

    ModificarCategorias = async (req = request, res= response) =>{
        try {
            const { id } = req.params;
            const updatecategorie = await categorieService.PatchCategories(id, req.body);

            if(updatecategorie){
                res.status(200).json({ message: 'Categoria updated successfully', updatecategorie });
            }
        }catch(error){
            res.status(400).json({ message: error.message });
            }     
    } ,

    eliminarCategorias= async (req = request, res= response) =>{
        const { id } = req.params;
            try{
                const dato = await categorieService.DeleteCategories(id);
                res.status(204).json({message: 'El dato fue eliminado', dato});
            }catch(error){
                const statusCode = error.status || 500;
                res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
            }      
    }

module.exports = {
   obtenercategorias,  
   obtenerCategoriasPorId,
   CrearCategorias,
   ModificarCategorias,
   eliminarCategorias
}