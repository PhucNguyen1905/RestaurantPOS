const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

module.exports = function (passport) {
    passport.use(new LocalStrategy(function (username, password, done) {
        connection.query('SELECT * FROM staff WHERE email = ?', [username], (err, staffs) => {
            if (err) throw err;
            if (staffs.length == 0) {
                return done(null, false, { message: 'No user found!' });
            }
            bcrypt.compare(password, staffs[0].password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, staffs[0])
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }
            })
        })
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })
    passport.deserializeUser(function (id, done) {
        connection.query('SELECT * FROM staff WHERE id = ?', [id], (err, staffs) => {
            done(err, staffs[0]);
        })
    })
}