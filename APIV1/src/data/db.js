const mysql = require('mysql');

const db = mysql.createConnection(
    {
         host: 'http://mysql-3c01adc3-creamysoft.h.aivencloud.com', 
        user: 'ravnadmin',   
        password: 'AVNS_jw_tWB4q26vSZMF5Rdg', 
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
