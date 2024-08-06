const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = { id: 1, username: 'Alejo González' }; 

const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Token generado:', token);


//Generar token por comando
// node generateToken.js