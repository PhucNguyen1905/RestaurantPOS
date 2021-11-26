const express = require("express");
const passport = require('passport');
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


// Register 
exports.viewRegister = (req, res) => {
    res.render('admin/register');
}

exports.register = (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let username = req.body.username;
    let phone = req.body.phone;
    let password = req.body.password;
    let role = parseInt(req.body.role);

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err)
                console.log(err);
            password = hash;
            connection.query('INSERT INTO staff (fname, lname, email,password, phone, role_id) VALUES(?,?,?,?,?,?)', [fname, lname, username, password, phone, role], (err, rows) => {
                if (err) throw err;
                res.redirect('/admin/login');
            })
        });
    });
}



// Login
exports.viewLogin = (req, res) => {
    if (res.locals.user) {
        res.redirect('/admin');
    }
    res.render('admin/login', {
        title: 'Log in'
    })
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: false
    })(req, res, next);
}


// GET logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/login');
}

