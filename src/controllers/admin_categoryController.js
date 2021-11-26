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

// View admin panel
exports.viewAdminPanel = (req, res) => {
    res.render('admin/index', {
        title: 'Dashboard'
    })

}

// View list of Category
exports.viewCategory = (req, res) => {
    connection.query('SELECT * FROM category', (err, categories) => {
        // When done with the connection, release it
        if (!err) {
            res.render('admin/category_list', {
                title: 'Category',
                hidden: 'hidden',
                messages: '',
                categories: categories
            })
        } else {
            console.log(err);
        }

    });
}

// View add category
exports.viewAddCategory = (req, res) => {
    res.render('admin/add_category', {
        title: 'Add new category'
    })

}
// POST add category
exports.addCategory = (req, res) => {
    let name = req.body.name;
    connection.query('INSERT INTO category(name) VALUES(?)', [name], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM category', (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/category_list', {
                        hidden: '',
                        messages: 'Category added',
                        title: 'Category',
                        categories: categories
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

// View Edit category
exports.viewEditCategory = (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM category WHERE id = ?', [id], (err, categories) => {
        // When done with the connection, release it
        if (!err) {
            res.render('admin/edit_category', {
                title: 'Edit category',
                cat: categories[0]
            })
        } else {
            console.log(err);
        }

    });

}
// POST edit category
exports.editCategory = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    connection.query('UPDATE category set name = ? WHERE id = ?', [name, id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM category', (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/category_list', {
                        hidden: '',
                        messages: 'Category edited',
                        title: 'Category',
                        categories: categories
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

// Delete category
exports.deleteCategory = (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM category WHERE id = ?', [id], (error, result) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM category', (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('admin/category_list', {
                        hidden: '',
                        messages: 'One category deleted',
                        title: 'Category',
                        categories: categories
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