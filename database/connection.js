const mysql = require('mysql');
require('dotenv').config()

const db_config = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    port : 3306,
    database : 'vansudharanodeapis'
})

db_config.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
})

module.exports = db_config;