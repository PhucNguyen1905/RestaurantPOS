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
        connection.query('SELECT * FROM user WHERE email = ?', [username], (err, users) => {
            if (err) throw err;
            if (users.length == 0)
                return done(null, false, { message: 'No user found!' });
            bcrypt.compare(password, users[0].password, function (err, isMatch) {
                if (err) throw err;
                if (password == users[0].password) {
                    return done(null, users[0])
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
        connection.query('SELECT * FROM user WHERE id = ?', [id], (err, users) => {
            done(err, users[0]);
        })
    })


}