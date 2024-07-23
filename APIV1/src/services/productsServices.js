const express = require('express');
const db = require('../data/db.js');
const {request , response} = require('express');
    
    
    const 
        getProduct = (req ,res) => {
            const sql = 'SELECT * FROM productos'

            db.query(sql, (err, results) => {
                if (err) {
                  console.error('Error fetching products:', err);
                  if (!res.headersSent) {
                    return res.status(500).json({ error: 'Database error' });
                  }
                }
            
                if (!res.headersSent) {
                  return res.json(results);
                }
              });
        } ,

        getProductID = (id) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM productos WHERE ID_producto = ?';

                db.query(sql, [id], (err, results) => {
                  if (err) {
                    console.error('Error fetching product:', err);
                    return reject({ status: 500, message: 'Error fetching product' });
                  }
                  if (results.length > 0) {
                    return resolve({ status: 200, data: results[0] }); // Devuelve el primer resultado
                  } else {
                    return resolve({ status: 404, message: 'Product not found' }); // No se encontró el producto
                  }
                });
              });
        } ,

        postProduct = (product) => {
            const sql = 'INSERT INTO productos(descripcion,precio_neto,estado_producto,ID_tipo_productos,ID_categoria,imagen) VALUES (?,?,?,?,?,?)'
            const {descripcion,precio_neto,estado_producto,ID_tipo_productos,ID_categoria,imagen}=product
        } ,
        
        patchProduct = () => {} ,

        deleteProduct = () => {} 

module.exports = {
    getProduct,
    getProductID,
    postProduct,
    patchProduct,
    deleteProduct
}