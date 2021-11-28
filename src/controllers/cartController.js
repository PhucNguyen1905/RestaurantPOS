const express = require('express');
const session = require('express-session');
const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
let USER;

// View cart
exports.viewCart = (req, res) => {
    USER = res.locals.user;
    if (req.session.cart && req.session.cart.length == 0 || typeof req.session.cart == "undefined") {
        delete req.session.cart;
        res.render('checkout', {
            title: 'My cart',
            isEmpty: 1
        })

    } else {
        res.render('checkout', {
            title: 'My cart',
            cart: req.session.cart,
            isEmpty: 0
        })
    }

}



// Add food to cart
exports.addFood = (req, res) => {
    let id = req.body.id;
    let baseURLImg = 'https://raw.githubusercontent.com/PhucNguyen1905/RestaurantPOS/main/images/';
    connection.query('SELECT * FROM food WHERE id = ?', [id], (err, dishes) => {
        if (!err) {
            let food = dishes[0];
            if (typeof req.session.cart == "undefined") {
                req.session.cart = [];
                req.session.cart.push({
                    name: food.name,
                    qty: req.body.quantity,
                    note: req.body.note,
                    price: parseInt(food.price),
                    image: baseURLImg + food.image,
                    category: food.categories,
                    id: id
                })
            } else {
                let cart = req.session.cart;
                let newItem = true;
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].name == food.name) {
                        cart[i].qty++;
                        newItem = false;
                        break;
                    }
                }
                if (newItem) {
                    req.session.cart.push({
                        name: food.name,
                        qty: req.body.quantity,
                        note: req.body.note,
                        price: parseInt(food.price),
                        image: baseURLImg + food.image,
                        category: food.categories,
                        id: id
                    })
                }
            }
        } else {
            console.log(err);
        }
        res.redirect('/menu');

    });
}

// Update cart
exports.updateCart = (req, res) => {
    let id = req.params.id;
    let cart = req.session.cart;
    let action = req.query.action;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            switch (action) {
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--;
                    if (cart[i].qty < 1) cart.splice(i, 1);
                    break;
                case 'clear':
                    cart.splice(i, 1);
                    if (cart.length == 0) delete req.session.cart;
                    break;
                default:
                    console.log('Update problem');
                    break;
            }
            break;
        }
    }
    res.redirect('/cart');

}

// Clear cart
exports.clearCart = (req, res) => {
    delete req.session.cart;
    res.redirect('/cart');

}
