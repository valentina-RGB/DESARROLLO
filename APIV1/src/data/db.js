const { Sequelize } = require('sequelize');

const db = new Sequelize('api_final', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false ,
  logging: console.log
});


db.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });



  async function syncDatabase() {
    try {
      await db.sequelize.sync({ force: true }); 
      await db.sequelize.sync({ alter: true })
      console.log('Todas las tablas han sido sincronizadas o creadas.');
  
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    }
  }



module.exports = {
  db,
  syncDatabase

};