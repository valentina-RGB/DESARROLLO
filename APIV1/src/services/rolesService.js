const express = require('express');
const db = require('../data/db.js');
const {request , response} = require('express');
    
    
    const 
        getRoles = (req ,res) => {
            const sql = 'SELECT * FROM roles'

            db.query(sql, (err, results) => {
                if (err) {
                  console.error('Error fetching roles:', err);
                  if (!res.headersSent) {
                    return res.status(500).json({ error: 'Database error' });
                  }
                }
            
                if (!res.headersSent) {
                  return res.json(results);
                }
              });
        } ,

        getRolesID = (id) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM roles WHERE ID_usuario = ?';

                db.query(sql, [id], (err, results) => {
                  
                  if (err) {
                    console.error('Error fetching roles:', err);
                    return reject({ status: 500, message: 'Error fetching roles' });
                  }

                  if (results.length > 0) {

                    return resolve({ status: 200, data: results[0] }); // Devuelve el primer resultado

                  } else {

                    return resolve({ status: 404, message: 'roles not found' }); // No se encontró el producto
                  }
                });
              });
        } ,

        postRoles = (roles) => {
            return new Promise((resolve, reject) => {
                
              if (!roles) {
                return reject(new Error('roles data is required'));
              }
              
                const {descripcion = '', estado_rol = '' } = roles;
        
                // Verificación de campos requeridos
                if (!descripcion || !estado_rol) {
                    return reject(new Error('Missing required fields'));
                  }
        
                const query = 'INSERT INTO roles (descripcion, estado_rol, ) VALUES (?, ?, ?)';
        
                db.query(query, [descripcion, estado_rol, ], (err, results) => {

                    if (err) {
                        return reject(err);
                    }
                    
                    resolve(results); 
                });
            });
        } ,
        
        patchRoles = (rolesId, roles) => {

            return new Promise((resolve, reject) => {
                const { descripcion, estado_rol } = roles;
                
                const query = `
                    UPDATE categorias 
                    SET descripcion = ?, estado_rol = ? 
                    WHERE ID_categoria = ?
                `;
                
                db.query(query, [descripcion, estado_rol, rolesId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
          }
      ,

        deleteRoles = (rolesId) => {
          return new Promise((resolve, reject) => {
            const query = 'DELETE FROM roles WHERE ID_ususario = ?'
            db.query(query,[rolesId],(err, results) => {
              if (err) {
                reject(err);
            } else {
                resolve(results);
            }
            })
          })
        } 

module.exports = {
    getRoles,
    getRolesID,
    postRoles,
    patchRoles,
    deleteRoles
}