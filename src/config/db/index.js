const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '38Python',
    database: 'benhvien'
})

module.exports = connection;    
