const express = require('express');
const {request , response} = require('express');

//const Pedidos = db.Pedidos;
const { Pedidos, Producto_Pedidos, Productos } = require('../../models');

    const 


    agregarDetalle = async () =>{

    },

    // Precio_producto = async (number) => {
    //     const precio_productos = await Productos.findAll(
    //         {
    //             where:{
    //                 ID_producto:number
    //             },
    //             attributes: ['descripcion'],
    //         }
    //  );
    //  return precio_productos
    // },

    CrearDetalle = async () => {
      
        const producto_pedidos = await Producto_Pedidos.findAll(
            // {
            //     where:{
            //         ID_pedidos: 1
            //     },
            //     attributes: ['ID_productos'],
            // }
);
        
   
        return producto_pedidos;
        
   

    }

   

// Crear un nuevo pedido y detalles del pedido
//     CrearPedidos = async (req, res) => {
//     try {
//         const { ID_clientes, productos } = req.body; // productos es un array de objetos con ID_productos y cantidad

//         // Crear un nuevo pedido
//         const nuevoPedido = await Pedidos.create({
//             ID_clientes,
//             fecha: new Date(),
//             precio_total: 0, // Esto se actualizará después
//             ID_estado_pedido: 1 // Por ejemplo, un estado inicial
//         });

//         let precioTotal = 0;

//         // Crear detalles del pedido
//         for (let prod of productos) {
//             const producto = await Productos.findByPk(prod.ID_productos);
//             if (!producto) {
//                 return res.status(404).json({ message: `Producto con ID ${prod.ID_productos} no encontrado` });
//             }

//             const precioNeto = producto.precio_neto;
//             const precioTotalProducto = precioNeto * prod.cantidad;
//             precioTotal += precioTotalProducto;

//             await Producto_Pedidos.create({
//                 ID_pedidos: nuevoPedido.ID_pedido,
//                 ID_productos: prod.ID_productos,
//                 cantidad: prod.cantidad,
//                 precio_neto: precioNeto,
//                 precio_total: precioTotalProducto,
//                 fecha: new Date()
//             });
//         }

//         // Actualizar el precio total del pedido
//         nuevoPedido.precio_total = precioTotal;
//         await nuevoPedido.save();

//         res.status(201).json(nuevoPedido);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error al crear el pedido', error });
//     }
// },
        

module.exports = {
    CrearDetalle
}