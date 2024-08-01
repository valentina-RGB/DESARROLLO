const express = require('express');
const db = require('../data/db.js');
const {request , response} = require('express');
    
    
    const 
        getAccess = (req ,res) => {
            const sql = 'SELECT * FROM acceso'

            db.query(sql, (err, results) => {
                if (err) {
                  console.error('Error fetching accesss:', err);
                  if (!res.headersSent) {
                    return res.status(500).json({ error: 'Database error' });
                  }
                }
            
                if (!res.headersSent) {
                  return res.json(results);
                }
              });
        } ,

        getAccesssID = (id) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM acceso WHERE ID_usuario = ?';

                db.query(sql, [id], (err, results) => {
                  
                  if (err) {
                    console.error('Error fetching access:', err);
                    return reject({ status: 500, message: 'Error fetching access' });
                  }

                  if (results.length > 0) {

                    return resolve({ status: 200, data: results[0] }); // Devuelve el primer resultado

                  } else {

                    return resolve({ status: 404, message: 'access not found' }); // No se encontró el producto
                  }
                });
              });
        } ,

        postAccess = (access) => {
            return new Promise((resolve, reject) => {
                
              if (!access) {
                return reject(new Error('access data is required'));
              }
              
                const {descripcion = '',  } = access;
        
                // Verificación de campos requeridos
                if (!descripcion ) {
                    return reject(new Error('Missing required fields'));
                  }
        
                const query = 'INSERT INTO acceso (descripcion) VALUES (?, ?, ?)';
        
                db.query(query, [descripcion], (err, results) => {

                    if (err) {
                        return reject(err);
                    }
                    
                    resolve(results); 
                });
            });
        } ,
        
        patchAccess = (accessId, access) => {

            return new Promise((resolve, reject) => {
                const { descripcion, ID_usuario } = access;
                
                const query = `
                    UPDATE acceso 
                    SET descripcion = ?
                    WHERE ID_usuario = ?
                `;
                
                db.query(query, [descripcion, ID_usuario, accessId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
          }
      

        

module.exports = {
    getAccess,
    getAccesssID,
    postAccess,
    patchAccess
}