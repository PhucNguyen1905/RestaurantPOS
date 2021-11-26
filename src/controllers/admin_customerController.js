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

exports.viewAccount = (req, res) => {
    connection.query('SELECT * FROM customer', (err, customers) => {
        // When done with the connection, release it
        if (!err) {
            res.render('admin/customer_list', {
                messages: '',
                customers: customers,
                title: 'Customer Account',
            })
        } 
        else {
            console.log(err);
        }
    });
}

exports.viewFeedback = (req, res) => {
    let id = req.body.id;
    let content = "";
    connection.query('SELECT * FROM feedback JOIN food on feedback.FoodID = food.id WHERE CustomerID = ?', [id], (err,feedback) => {
        if (!err) {
            if (feedback.length > 0) {
                for (let i = 1; i <= feedback.length; i++) {
                    content += "<div class='accordion-item'>";
                    content += "<h2 class='accordion-header' id='heading" + i + "'></h2>";
                    content += "<button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapse" + i + "' aria-expanded='true' aria-controls='collapse" + feedback[i-1].id + "'>" ;
                    content += "Feedback on \"" + feedback[i-1].name + "\" at " + feedback[i-1].date.toLocaleString();
                    content += "</button>" + "</h2>";
                    content += "<div id='collapse" + i + "' class='accordion-collapse collapse' aria-labelledby='heading" + i + "' data-bs-parent='#feedbackAccordion'>";
                    content += "<div class='accordion-body'>";
                    content += feedback[i-1].content;
                    content += "</div>" + "</div>" + "</div>";
                }
            }
            res.json({content: content}); 
        }
        else {
            console.log(err);
            res.json({content: content});  
        }          
    });
}

exports.deleteAccount = (req, res) => {
    let id = req.body.id;
    connection.query('DELETE FROM customer WHERE id = ?', [id], (err) => {
        if (!err) {
            res.json({content: 'Success!'}); 
        }
        else res.json({content: err});
    });
}