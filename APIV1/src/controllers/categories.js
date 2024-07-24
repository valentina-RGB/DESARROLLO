const express = require('express');
const {request , response} = require('express');
const categorieService = require('../services/categoriesServices');

const 
    
    getCategorie = (req= req, res= response) =>{
        const allcategories = categorieService.getCategorie(req,res)
    } ,  
    
    getCategorieID = async (req = request, res= response) =>{  
        const categorieId = req.params.id;

        try {
            const onecategorie = await   categorieService.getCategoriesID(categorieId)
            return res.status(onecategorie.status).json(onecategorie.data || { message: onecategorie.message });
          } catch (error) {
            return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
          }
    } ,  

    postCategorie = async  (req = request, res= response) => {
        try {
            const categorie = req.body;
            const result = await categorieService.postCategorie(categorie); // Suponiendo que `postcategorieService` es tu función de servicio
            res.status(201).json({ message: 'Categorie created successfully', result });
        } catch (error) {
            // Verifica que el error tenga un código de estado válido o usa un código por defecto
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    
    } ,

    patchCategorie = async (req = request, res= response) =>{
        try {
            const categorieId = req.params.id;
            const categorie = req.body; 
            const updatecategorie = await categorieService.patchCategorie(categorieId,categorie);

            res.status(200).json({ message: 'Categorie updated successfully',updatecategorie });
            
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    } ,

    deleteCategorie = async (req = request, res= response) =>{
        try {
            const categorieId = req.params.id; 
            const result = await categorieService.deleteCategorie(categorieId);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Categorie not found' });
            }
            
            res.status(200).json({ message: 'Categorie deleted successfully' });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        } 
    }


module.exports = {
   getCategorie,
   getCategorieID,
   postCategorie,
   patchCategorie,
   deleteCategorie
}