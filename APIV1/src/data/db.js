const { Sequelize } = require('sequelize');

const db = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }    
    console.log('Connected to the database.');
    });

    module.exports = db;