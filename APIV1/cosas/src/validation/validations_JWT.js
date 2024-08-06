const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const user = require('../../models/Acceso')
// const app = express();
// const port = 3000;

// Middleware para validar el jwt
const authenticateToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

// Ruta pública
// app.get('/public', (req, res) => {
//     res.send('Ruta pública accesible sin autenticación');
// });

// // Ruta protegida
// app.get('/protected', authenticateToken, (req, res) => {
//     res.send('Ruta protegida accesible solo con JWT válido');
// });

// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });


module.exports = {
    authenticateToken
}