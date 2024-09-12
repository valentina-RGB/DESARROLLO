const express = require('express');
const {request , response} = require('express');
const { Insumos, Producto_insumos, Productos, Tipo_productos, Estado_producto,Categorias } = require("../../models");


  
const


    getProductos = async (res,req) => {
      const productos = await Productos.findAll(
      {
        include:[
         {
          model: Insumos,
          as: 'Insumos',
          through:{attributes:['cantidad','configuracion', 'precio']}
         }
        ]
      }
      );
        res.status(200).json(productos);
    },
        
    getProductosID = async (id) => {
      const productos = await Productos.findByPk(id, 
        {
          include:[
           {
            model: Insumos,
            as: 'Insumos',
            through:{attributes:['cantidad','configuracion', 'precio']}
           }
          ]
        }
        );
        return productos;
    } ,

   

    CreateProdutos = async (ID_tipo_productos, Insumos, precio, cantidad, nombre, descripcion, precio_neto, ID_categorias, imagen) => {
      let bandera = false;
      let respuesta = "";
    
      // if (ID_estado_productos) {
      //   const estado = await Estado_producto.findByPk(ID_estado_productos); // Asegúrate de usar await aquí
      //   if (estado==0) {
      //     bandera = true;
      //     respuesta =  "Estado no encontrado"
         
      //   }
      // }
    
      if (ID_tipo_productos) {
        const tipo = await Tipo_productos.findByPk(ID_tipo_productos); // Asegúrate de usar await aquí
        if (!tipo) {
          respuesta = 'Tipo de producto no encontrado';
          bandera = true;
        }
      }
    
      if (ID_categorias) {
        const categoria = await Categorias.findByPk(ID_categorias); // Asegúrate de usar await aquí
        if (!categoria) {
          bandera = true;
          respuesta = "Categoría no encontrada";
          
        }
      }

  
      if (ID_categorias) {
        const categoria = await Categorias.findByPk(ID_categorias); // Asegúrate de usar await aquí
        if (!categoria) {
          bandera = true;
          respuesta = "Categoría no encontrada";
          
        }
      }
      
        
      if(nombre){
        const Existenciaproducto = await Productos.findOne({where:{nombre:nombre}})
        if(Existenciaproducto === null){
        
        }else{
          bandera = true;
          respuesta = "Producto Duplicado";
        }
      }
  
    
      if (!bandera) {
        const Nuevoproducto = await Productos.create({
          nombre: nombre,
          descripcion: descripcion,
          precio_neto: precio_neto,
          estado_productos: "D",
          ID_tipo_productos: ID_tipo_productos,
          ID_categorias: ID_categorias,
          imagen: imagen || 'N/A'
        });  


        
      if (Array.isArray(Insumos)) {
        for (const insumo of Insumos) {
          if (insumo && insumo.Producto_insumos) {
            await Producto_insumos.create({
              ID_productos_tipo: Nuevoproducto.ID_producto,
              ID_insumos_tipo: insumo.ID_insumo,
              cantidad: insumo.Producto_insumos.cantidad,
              configuracion: insumo.Producto_insumos.configuracion,
              precio: insumo.precio * insumo.Producto_insumos.cantidad
            });
     
          } else {
            console.error('Insumo o propiedades de insumo no están definidos:', insumo);
          }

        }
        
      }
        
        return { status: 201, message: 'El producto ha sido agregado con éxito', Nuevoproducto };        
      }
        else{
          return { status: 404, message: respuesta  || 'Error no especificado' }; // Garantiza que siempre haya un mensaje       
      }
      
    },
    
        
    PatchProductos = async (id, data) => {
      
      const [updated] = await Productos.update(data, {
        where: {ID_producto:id},
      });

      if (updated) {
        const updatedProducto = await Productos.findByPk(id);
        return updatedProducto;
      }else{
        return { status: 404, message: 'Producto not found' };
      }
      
    },

    DeleteProductos = async (id) => {
      const deleted = await Productos.destroy({ where: {ID_producto: id}, });
      if (deleted) {
        return deleted;
      }else{
        return {status: 404, message: 'Product not found' };
      }
    } 


module.exports = {
  getProductos,
  getProductosID,
  CreateProdutos,
  PatchProductos,
  DeleteProductos,
}