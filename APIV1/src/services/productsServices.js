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

                    return resolve({ status: 200, data: results[0] }); 

                  } else {

                    return resolve({ status: 404, message: 'Product not found' }); 
                  }
                });
              });
        } ,

        postProduct = (product) => {
            return new Promise((resolve, reject) => {
                if (!product) {
                    return reject(new Error('Product data is required'));
                }
        
                const {descripcion = '', precio_neto = 0, estado_producto = '', ID_tipo_productos = 0, ID_categoria = 0, imagen = '' } = product;
        
                // Verificación de campos requeridos
                if (!descripcion || !precio_neto) {
                    return reject(new Error('Missing required fields'));
                  }
        
                const query = 'INSERT INTO productos (descripcion, precio_neto, estado_producto, ID_tipo_productos, ID_categoria, imagen) VALUES (?, ?, ?, ?, ?, ?)';
        
                db.query(query, [descripcion, precio_neto, estado_producto, ID_tipo_productos, ID_categoria, imagen], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results); 
                });
            });
        } 
        
        const patchProduct = async (id, productData) => {
          const product = await Product.findByPk(id);
          if (!product) {
              throw { status: 404, message: 'Product not found' };
          }
          await product.update(productData);
          return product;
      };

        const deleteProduct = async (id) => {
          const product = await Product.findByPk(id);
          if (!product) {
              throw { status: 404, message: 'Product not found' };
          }
          await product.destroy();
      };

module.exports = {
    getProduct,
    getProductID,
    postProduct,
    patchProduct,
    deleteProduct
}