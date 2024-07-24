const express = require('express');
const db = require('../data/db.js');
const {request , response} = require('express');
    
    
    const 
        getClient = (req ,res) => {
            const sql = 'SELECT * FROM clientes'

            db.query(sql, (err, results) => {
                if (err) {
                  console.error('Error fetching clients:', err);
                  if (!res.headersSent) {
                    return res.status(500).json({ error: 'Database error' });
                  }
                }
            
                if (!res.headersSent) {
                  return res.json(results);
                }
              });
        } ,

        getClientsID = (id) => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM clientes WHERE cliente = ?';

                db.query(sql, [id], (err, results) => {
                  
                  if (err) {
                    console.error('Error fetching client:', err);
                    return reject({ status: 500, message: 'Error fetching client' });
                  }

                  if (results.length > 0) {

                    return resolve({ status: 200, data: results[0] }); 

                  } else {

                    return resolve({ status: 404, message: 'client not found' });
                  }
                });
              });
        } ,

        postClient = (client) => {
            return new Promise((resolve, reject) => {
                
              if (!client) {
                return reject(new Error('client data is required'));
              }
              
                const {ID_cliente = '', estado_cliente = ''} = client;
        
                // Verificación de campos requeridos
                if (!ID_cliente || !estado_cliente) {
                    return reject(new Error('Missing required fields'));
                  }
        
                const query = 'INSERT INTO clientes (ID_cliente, estado_cliente) VALUES (?, ?, ?)';
        
                db.query(query, [ID_cliente, estado_cliente, ], (err, results) => {

                    if (err) {
                        return reject(err);
                    }
                    
                    resolve(results); 
                });
            });
        } ,
        
        patchClient = (clientId, client) => {

            return new Promise((resolve, reject) => {
                const { ID_cliente, estado_cliente, } = client;
                
                const query = `
                    UPDATE clientes 
                    SET ID_cliente = ?, estado_cliente = ?, = ?
                    WHERE ID_cliente = ?
                `;
                
                db.query(query, [ID_cliente, estado_cliente, ], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
          }
      ,

        deleteClient = (clientId) => {
          return new Promise((resolve, reject) => {
            const query = 'DELETE FROM clientes WHERE ID_cliente = ?'
            db.query(query,[clientId],(err, results) => {
              if (err) {
                reject(err);
            } else {
                resolve(results);
            }
            })
          })
        } 

module.exports = {
    getClient,
    getClientsID,
    postClient,
    patchClient,
    deleteClient
}