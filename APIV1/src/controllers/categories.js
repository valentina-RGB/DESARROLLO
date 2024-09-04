const express = require("express");
const { request, response } = require("express");
const categorieService = require("../services/categoriesServices");
const multer = require("multer");
const path = require("path");
const fs = require('fs');


// Configuración de multer para guardar la imagen en el servidor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
  },
});

const upload = multer({ storage });



const obtenercategorias = async (req, res) => {
    try {
      return await categorieService.getCategorie(res, req);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  obtenerCategoriasPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const categorias = await categorieService.getCategoriesID(id);

      if (categorias) {
        res.status(200).json(categorias);
      } else {
        res.status(404).json({ message: "Categorias not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const CrearCategorias = async (req = request, res = response) => {
  try {
  
    const { estado, descripcion} = req.body;
    let imagen = null;

    // Si hay un archivo, obtener la ruta del archivo
    if (req.file) {
      imagen = `/uploads/${req.file.filename}`; // Ruta de la imagen
    }

    const data = {
       descripcion,
       estado,
       imagen: imagen||'',
    };

    const categorias = await categorieService.CreateCategories(data);
    res
      .status(201)
      .json({ message: "Categorie created successfully", categorias });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



  const ModificarCategorias = async (req = request, res = response) => {
    const {id} = req.params;
    const {descripcion, estado_categoria,imagen} = req.body

    const data ={
      descripcion: descripcion,
      estado_categoria: estado_categoria,
      imagen: imagen
    }
    try {
      
      const updatecategories = await categorieService.PatchCategories(id, data);

      if (updatecategories) {
        res
          .status(200)
          .json({ message: "Categoria updated successfully", updatecategories });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };



  const eliminarCategorias = async (req = request, res = response) => {
    const { id} = req.params;
    try {

    //  Busca la categoría para obtener la imagen asociada
     const categoria = await categorieService.getCategoriesID(id);
     if (!categoria) {
         return res.status(404).json({ message: "Categoría no encontrada" });
         
     }
     const filePath = path.join( 'uploads', path.basename(categoria.imagen));

        // Verificar si la ruta corresponde a un archivo y eliminarlo si existe
        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
          try {
              fs.unlinkSync(filePath); // Elimina el archivo
          } catch (err) {
              console.error("Error al intentar eliminar el archivo:", err);
          }
      } else {
          // console.warn("El archivo no fue encontrado o no es un archivo, se procederá a eliminar la categoría.");
        // res.json({ message: "La categorpia fue eliminada con éxito"});
    
        }

      const dato = await categorieService.DeleteCategories(id);
      res.json({ message: "La categorpia fue eliminada con éxito"});
    


    } catch (error) {
      const statusCode = error.status || 500;
      res
.status(statusCode)
        .json({ error: error.message || "Internal Server Error" });
    }
  };

module.exports = {
  obtenercategorias,
  obtenerCategoriasPorId,
  CrearCategorias,
  ModificarCategorias,
  eliminarCategorias,
  upload,
};
