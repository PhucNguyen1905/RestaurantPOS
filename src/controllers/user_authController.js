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
    res.render('register', {
        title: 'Đăng ký'
    });
}

exports.register = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let address = req.body.address;
    let role = 5;

    let sql = 'INSERT INTO user (fname, lname, email,password, phone,address, role_id) VALUES(?,?,?,?,?,?,?)'
    connection.query(sql, [fname, lname, username, password, phone, address, role], (err, rows) => {
        if (err) throw err;
        res.redirect('/login');
    })



}



// Login
exports.viewLogin = (req, res) => {
    if (res.locals.user) {
        res.redirect('/');
    }
    res.render('login', {
        title: 'Log in'
    })
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    })(req, res, next);
}


// GET logout
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
}

