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


// View list of food
exports.viewFood = (req, res) => {
    connection.query('SELECT * FROM food', (err, foods) => {
        // When done with the connection, release it
        if (!err) {
            res.render('admin/food_list', {
                hidden: 'hidden',
                messages: '',
                title: 'Food',
                foods: foods
            })
        } else {
            console.log(err);
        }

    });


}

// View add food
exports.viewAddFood = (req, res) => {
    connection.query('SELECT * FROM category', (err, categories) => {
        // When done with the connection, release it
        if (!err) {
            res.render('admin/add_food', {
                title: 'Add new food',
                categories: categories
            })
        } else {
            console.log(err);
        }

    });

}
// POST add food
exports.addFood = (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let brief = req.body.brief;
    let description = req.body.description;
    let categories = req.body.category;
    let image = req.body.image;
    connection.query('INSERT INTO food(name,price,categories,brief,description,image) VALUES(?,?,?,?,?,?)', [name, price, categories, brief, description, image], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM food', (err, foods) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/food_list', {
                        hidden: '',
                        messages: 'Food added',
                        title: 'Food',
                        foods: foods
                    })
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(error);
        }

    });


}

// View Edit food
exports.viewEditFood = (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM food WHERE id = ?', [id], (error, foods) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM category', (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/edit_food', {
                        title: 'Edit Food',
                        food: foods[0],
                        categories: categories
                    })
                } else {
                    console.log(err);
                }

            });

        } else {
            console.log(err);
        }

    });

}
// POST edit food
exports.editFood = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let brief = req.body.brief;
    let description = req.body.description;
    let categories = req.body.category;
    let image = req.body.image;
    connection.query('UPDATE food set name = ?, price = ?, categories = ?, brief = ?, description = ?, image = ? WHERE id = ?', [name, price, categories, brief, description, image, id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM food', (err, foods) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/food_list', {
                        hidden: '',
                        messages: 'Food edited',
                        title: 'Food',
                        foods: foods
                    })
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(error);
        }

    });


}

// Delete food
exports.deleteFood = (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM food WHERE id = ?', [id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM food', (err, foods) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/food_list', {
                        hidden: '',
                        messages: 'One food deleted',
                        title: 'Food',
                        foods: foods
                    })
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(error);
        }
    });
}


// GET status ON
exports.statusOn = (req, res) => {
    let status = 'on';
    let id = req.params.id;
    connection.query('UPDATE food SET status = ? WHERE id = ?', [status, id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM food', (err, foods) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/food_list', {
                        hidden: '',
                        messages: 'The food is available on Menu',
                        title: 'Food',
                        foods: foods
                    })
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(error);
        }
    });
}
// GET status OFF
exports.statusOff = (req, res) => {
    let status = 'off';
    let id = req.params.id;
    connection.query('UPDATE food SET status = ? WHERE id = ?', [status, id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM food', (err, foods) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/food_list', {
                        hidden: '',
                        messages: 'The food is hidden from Menu',
                        title: 'Food',
                        foods: foods
                    })
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(error);
        }
    });
}