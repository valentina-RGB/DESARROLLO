const express = require('express');
const db = require('../data/db.js');
const { request, response } = require('express');

const getInsumos = (req = request, res = response) => {
    const sql = 'SELECT * FROM Insumos';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching insumos:', err);
            if (!res.headersSent) {
                return res.status(500).json({ error: 'Database error' });
            }
        }

        if (!res.headersSent) {
            return res.json(results);
        }
    });
};

const getInsumoByID = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Insumos WHERE ID_insumo = ?';

        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error('Error fetching insumo:', err);
                return reject({ status: 500, message: 'Error fetching insumo' });
            }

            if (results.length > 0) {
                return resolve({ status: 200, data: results[0] });
            } else {
                return resolve({ status: 404, message: 'Insumo not found' });
            }
        });
    });
};

const postInsumo = (insumo) => {
    return new Promise((resolve, reject) => {
        if (!insumo) {
            return reject(new Error('Insumo data is required'));
        }

        const { ID_tipo_insumo = 0, descripcion_insumo = '', estado_insumo = 'D', precio = 0.0 } = insumo;

        if (!ID_tipo_insumo || !descripcion_insumo) {
            return reject(new Error('Missing required fields'));
        }

        const query = 'INSERT INTO Insumos (ID_tipo_insumo, descripcion_insumo, estado_insumo, precio) VALUES (?, ?, ?, ?)';

        db.query(query, [ID_tipo_insumo, descripcion_insumo, estado_insumo, precio], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const patchInsumo = (id, insumoData) => {
    return new Promise((resolve, reject) => {
        const { ID_tipo_insumo, descripcion_insumo, estado_insumo, precio } = insumoData;
        const query = 'UPDATE Insumos SET ID_tipo_insumo = ?, descripcion_insumo = ?, estado_insumo = ?, precio = ? WHERE ID_insumo = ?';

        db.query(query, [ID_tipo_insumo, descripcion_insumo, estado_insumo, precio, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject({ status: 404, message: 'Insumo not found' });
            }
            resolve(results);
        });
    });
};

const deleteInsumo = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Insumos WHERE ID_insumo = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.affectedRows === 0) {
                return reject({ status: 404, message: 'Insumo not found' });
            }
            resolve(results);
        });
    });
};

module.exports = {
    getInsumos,
    getInsumoByID,
    postInsumo,
    patchInsumo,
    deleteInsumo
};
