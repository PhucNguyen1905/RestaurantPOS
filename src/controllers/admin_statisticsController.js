const express = require('express');
const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


exports.viewBestsellers = (req, res) => {
    var month = ['jan','feb','mar','apr','may','june','july','aug','sep','oct','nov','dec'];
    const date = new Date();
    var m = date.getMonth();
    sql = 'SELECT * FROM statistics ORDER BY ' + month[m] + ' DESC LIMIT 10';
    connection.query(sql, (err, sold) => {
        if (!err) {
            sold.sort(function(a, b) { return a.id - b.id });
            connection.query('SELECT * FROM food WHERE id IN (?)', [sold.map(a => a.id)],(err, food) => {
                res.render('admin/bestseller', {
                    title: 'Bestsellers of the month',
                    sold: sold.map(a => a[month[m]]),
                    food: food,
                })
            });
        }
        else console.log(err);
    });
}


exports.viewRevenue = (req, res) => {
    var month = ['jan','feb','mar','apr','may','june','july','aug','sep','oct','nov','dec'];
    connection.query('SELECT * FROM food', (err, food) => {
        if (!err) {
            connection.query('SELECT * FROM statistics WHERE id IN (?)', [food.map(a => a.id)], (err, data) => {
                var revenue = [0,0,0,0,0,0,0,0,0,0,0,0];
                for (var i = 0; i < food.length; i++) {
                    for (var j = 0; j < 12; j++) {
                        revenue[j] += food[i].price * data[i][month[j]];
                    }
                }
                res.render('admin/revenue', {
                    title: 'Revenue of the year',
                    revenue: revenue
                })
            });
        }
    });
}

