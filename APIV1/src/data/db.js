const { Sequelize } = require('sequelize');

const db = new Sequelize('api_final', 'root', '', {
  host:'mysql-3c01adc3-creamysoft.h.aivencloud.com',
  user:'avnadmin',
  password:'AVNS_jw_tWB4q26vSZMF5Rdg',
  database:'creamy',
  port: 26923,
});


db.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = db;