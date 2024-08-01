const { Sequelize } = require('sequelize');

const db = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});


db.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = db;