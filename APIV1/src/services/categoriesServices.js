const express = require('express');
const db = require('../data/db.js');
const {request , response} = require('express');
    
    
    const 
        getCategorie = (req ,res) => {
            const sql = 'SELECT * FROM categorias'

            db.query(sql, (err, results) => {
                if (err) {
                  console.error('Error fetching categories:', err);
                  if (!res.headersSent) {
                    return res.status(500).json({ error: 'Database error' });
                  }
                }
            
                if (!res.headersSent) {
                  return res.json(results);
                }
              });
        } ,

        getCategoriesID = (id) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM categorias WHERE ID_categoria = ?';

                db.query(sql, [id], (err, results) => {
                  
                  if (err) {
                    console.error('Error fetching categorie:', err);
                    return reject({ status: 500, message: 'Error fetching categorie' });
                  }

                  if (results.length > 0) {

                    return resolve({ status: 200, data: results[0] }); // Devuelve el primer resultado

                  } else {

                    return resolve({ status: 404, message: 'Categorie not found' }); // No se encontró el producto
                  }
                });
              });
        } ,

        postCategorie = (categorie) => {
            return new Promise((resolve, reject) => {
                
              if (!categorie) {
                return reject(new Error('Categorie data is required'));
              }
              
                const {descripcion = '', estado_categoria = '', imagen = '' } = categorie;
        
                // Verificación de campos requeridos
                if (!descripcion || !estado_categoria) {
                    return reject(new Error('Missing required fields'));
                  }
        
                const query = 'INSERT INTO categorias (descripcion, estado_categoria, imagen) VALUES (?, ?, ?)';
        
                db.query(query, [descripcion, estado_categoria, imagen], (err, results) => {

                    if (err) {
                        return reject(err);
                    }
                    
                    resolve(results); 
                });
            });
        } ,
        
        patchCategorie = (categorieId, categorie) => {

            return new Promise((resolve, reject) => {
                const { descripcion, estado_categoria, imagen } = categorie;
                
                const query = `
                    UPDATE categorias 
                    SET descripcion = ?, estado_categoria = ?, imagen = ?
                    WHERE ID_categoria = ?
                `;
                
                db.query(query, [descripcion, estado_categoria, imagen, categorieId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
          }
      ,

        deleteCategorie = (categorieId) => {
          return new Promise((resolve, reject) => {
            const query = 'DELETE FROM categorias WHERE ID_categoria = ?'
            db.query(query,[categorieId],(err, results) => {
              if (err) {
                reject(err);
            } else {
                resolve(results);
            }
            })
          })
        } 

module.exports = {
    getCategorie,
    getCategoriesID,
    postCategorie,
    patchCategorie,
    deleteCategorie
}