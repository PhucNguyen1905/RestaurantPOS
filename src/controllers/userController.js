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
// View home
exports.viewHome = (req, res) => {
    USER = res.locals.user;
    connection.query('SELECT * FROM food', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
            res.render('home', {
                rows: rows,
                title: 'Home',
                user: USER
            });
        } else {
            console.log(err);
        }

    });


}

// GET food detail
exports.viewDetail = (req, res) => {
    connection.query("SELECT * FROM food WHERE id = ?", [req.params.id], (error, dishes) => {
        if (!error) {
            connection.query('SELECT * FROM category WHERE id = ?', [dishes[0].categories], (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    connection.query('SELECT * FROM feedback JOIN user on feedback.CustomerID = user.id WHERE FoodID = ? ORDER BY date DESC', [dishes[0].id], (er, feedback) => {
                        if (!er) {
                            res.render('food_detail', {
                                title: dishes[0].name,
                                category: categories[0].name,
                                dish: dishes[0],
                                feedback: feedback,
                                user: USER
                            });
                        }
                        else {
                            console.log(er);
                        }
                    });
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(err);
        }

    });

};


// View menu
exports.viewMenu = (req, res) => {
    let status = 'on';
    connection.query('SELECT * FROM food WHERE status = ?', [status], (error, rows) => {
        // When done with the connection, release it
        if (!error) {
            connection.query('SELECT * FROM category', (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('menu', {
                        rows: rows,
                        categories: categories,
                        title: 'Menu',
                        user: USER
                    });
                } else {
                    console.log(err);
                }

            });

        } else {
            console.log(err);
        }

    });
}

// View menu by Filter
exports.viewMenuFilter = (req, res) => {
    let cat = req.body.category;
    let status = 'on'
    if (cat == 0) {
        connection.query('SELECT * FROM food WHERE status = ?', [status], (error, rows) => {
            if (!error) {
                connection.query('SELECT * FROM category', (err, categories) => {
                    // When done with the connection, release it
                    if (!err) {
                        res.render('filter_menu', {
                            rows: rows,
                            title: 'Tất cả',
                            catID: cat,
                            categories: categories,
                            user: USER
                        });
                    } else {
                        console.log(err);
                    }

                });

            } else {
                console.log(error);
            }

        });
    }
    else {
        connection.query('SELECT * FROM food WHERE status = ? AND categories = ?', [status, cat], (error, rows) => {
            if (!error) {
                connection.query('SELECT * FROM category', (err, categories) => {
                    // When done with the connection, release it
                    if (!err) {
                        res.render('filter_menu', {
                            rows: rows,
                            title: 'Filter Menu',
                            catID: cat,
                            categories: categories,
                            user: USER
                        });
                    } else {
                        console.log(err);
                    }

                });

            } else {
                console.log(error);
            }

        });
    }
}

// View menu by Search
exports.viewMenuSearch = (req, res) => {
    let search = req.body.search;
    connection.query("SELECT * FROM food WHERE status = 'on' AND name LIKE ?", '%' + [search] + '%', (error, rows) => {
        if (!error) {
            connection.query('SELECT * FROM category', (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    res.render('menu', {
                        rows: rows,
                        categories: categories,
                        title: 'Menu',
                        user: USER
                    });
                } else {
                    console.log(err);
                }

            });
        } else {
            console.log(error);
        }

    });
}

// View about and review
exports.viewAbout = (req, res) => {
    res.render('about', {
        title: 'About Us',
        user: USER
    });
}

// View order
exports.viewOrder = (req, res) => {
    res.render('order', {
        title: 'Order',
        user: USER
    });
}

exports.viewInfo = (req, res) => {
    res.render('info', {
        title: 'Info',
        user: USER
    })

};

exports.updateInfo = (req, res) => {
    connection.query('UPDATE user SET lname = ?, fname = ?, phone = ?, email = ?, image = ? WHERE id = ?', [req.body.lname, req.body.fname, req.body.phone, req.body.email, req.body.image, USER.id], (err) => {
        if (!err) {
            res.redirect('/logout');
        }
        else {
            console.log(err);
        }
    });
}

exports.giveFeedback = (req, res) => {
    let content = req.body.content;
    let userid = req.body.userid;
    let foodid = req.body.foodid;
    connection.query('INSERT INTO feedback(content,CustomerID, FoodID) VALUES(?, ?, ?)', [content, userid, foodid], (err) => {
        if (!err) {
            res.json({ msg: 'success' });
        }
        else {
            res.json({ msg: err });
        }
    });
}