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

