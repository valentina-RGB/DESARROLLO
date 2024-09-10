const express = require('express');
const {request , response} = require('express');
const ProductosService = require('../services/productsServices');
const multer = require('multer');
const  path  = require('path');
const fs= require('fs'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ruta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

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
                res.status(200).json(productos)      
            }else{
                res.status(404).json({message: 'Product not found' })
            }               
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    CrearProductos = async  (req = request, res= response) => {
        const { ID_tipo_productos, Insumos, precio, cantidad, nombre, descripcion, precio_neto,ID_estado_productos, ID_categorias } = req.body;

        let imagen = null;

        // Si hay un archivo, obtener la ruta del archivo
          if (req.file) {
            imagen = `/imagenes/${req.file.filename}`; // Ruta de la imagen
          }   
          
        try {        
            const productos = await ProductosService.CreateProdutos(ID_tipo_productos, Insumos, precio, cantidad, nombre, descripcion, precio_neto,ID_estado_productos, ID_categorias,imagen );

            if(productos){
            res.json(productos);
            }
            
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    
    } ,

    ModificarProductos = async (req = request, res= response) =>{
        try {
            const { id } = req.params;
            const updateproducto = await ProductosService.PatchProductos(id, req.body);

            if(updateproducto){
                res.status(200).json({ message: 'Product updated successfully', updatecategorie });
            }
        }catch(error){
            res.status(400).json({ message: error.message });
            }     
    } ,

    EliminarProductos= async (req = request, res= response) =>{
        const { id } = req.params;
            try{
                  // Buscar la categoría para obtener la imagen
      const producto = await ProductosService.getProductosID(id);  // Asegúrate de tener este método implementado
      
      // Si la categoría tiene una imagen
      if (producto && producto.imagen) {
        // Construir la ruta absoluta de la imagen
        const imagePath = path.join(__dirname, '../../uploads', path.basename(producto.imagen));  // Ajusta la ruta a donde guardas las imágenes
        
        // Verificar si la imagen existe
        if (fs.existsSync(imagePath)) {
          // Eliminar la imagen
          fs.unlinkSync(imagePath);
        }
      }
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
   EliminarProductos,
   upload
}