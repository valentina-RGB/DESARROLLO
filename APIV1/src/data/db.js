const mysql = require('mysql');

const db = mysql.createConnection(
    {
         host: 'localhost', 
        user: 'admin',   
        password: '', 
        database: 'creamy'
    });


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }    
    console.log('Connected to the database.');
    });

    module.exports = db;
