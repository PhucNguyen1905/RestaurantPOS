const mysql = require("mysql");

//Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View user
exports.viewHome = (req, res) => {
    res.render('home');
}
