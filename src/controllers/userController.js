const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View home
exports.viewHome = (req, res) => {
    connection.query('SELECT * FROM food', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
            res.render('home', {
                rows: rows,
                title: 'Home'
            });
        } else {
            console.log(err);
        }

    });


}

function getCategory(num) {
    if (num == 0) { return 'Món chính'; }
    else if (num == 1) { return 'Món khai vị'; }
    else if (num == 2) { return 'Tráng miệng'; }
    else { return 'Nước uống' }
}

// GET food detail
exports.viewDetail = (req, res) => {
    connection.query("SELECT * FROM food WHERE id = ?", [req.params.id], (error, dishes) => {
        if (!error) {
            connection.query('SELECT * FROM category WHERE id = ?', [dishes[0].categories], (err, categories) => {
                // When done with the connection, release it
                if (!err) {
                    connection.query('SELECT * FROM feedback JOIN customer on feedback.CustomerID = customer.id WHERE FoodID = ? ORDER BY date DESC', [dishes[0].id], (er, feedback) => {
                        if (!er) {
                            res.render('food_detail', {
                                title: dishes[0].name,
                                category: categories[0].name,
                                dish: dishes[0], 
                                feedback: feedback,
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
            console.log(error);
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
                        title: 'Menu'
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
                            categories: categories
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
                            categories: categories
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
                        title: 'Menu'
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
        title: 'About Us'
    });
}

// View order
exports.viewOrder = (req, res) => {
    res.render('order', {
        title: 'Order'
    });
}

//View register
exports.viewRegister = (req, res) => {
    res.render('register', {
        title: 'Register'
    });
}

exports.register = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    connection.query('INSERT INTO customer(name,phone,mail,password) VALUES(?, ?, ?, ?)', [name,phone,email,password], (err) => {
        if (!err) {
            res.redirect('/login');
        }
        else {
            console.log(err);
        }          
    });
}

//View login
exports.viewLogin = (req, res) => {
    if (typeof req.session.user != 'undefined') {
        res.redirect('/');
    }
    else {
        res.render('login', {
            title: 'Login',
            message: '',
        });
    }
}

exports.login = (req, res) => {
    let password = req.body.password;
    let phone = req.body.phone;
    connection.query('SELECT * FROM customer WHERE phone = ? AND password = ?', [phone,password], (err, rows) => {
        if (!err) {
            if (rows.length==0) {
                res.render('login', {
                    title: 'Login',
                    message: 'Incorrect phone number or password',
                });
            }
            else {
                req.session.user = [];
                req.session.user.push({
                    id: rows[0].id,
                    name: rows[0].name,
                    phone: rows[0].phone,
                    email: rows[0].mail,
                    password: rows[0].password,
                    point: rows[0].point,
                    image: rows[0].image,
                });
                res.redirect('/');
            }
        } 
        else {
            console.log(err);
        }
    });
}

exports.logout = (req, res) => {
    delete req.session.user;
    res.redirect('/');
}

exports.viewInfo = (req, res) => {
    if (typeof req.session.user == 'undefined') {
        res.sendStatus(403);
    }
    else {
        res.render('info',{
            title: 'Info',
        })
    }
};

exports.updateInfo = (req, res) => {
    console.log(req.body.name, req.body.image);
    connection.query('UPDATE customer SET name = ?, phone = ?, mail = ?, image = ? WHERE id = ?', [req.body.name,req.body.phone,req.body.email,req.body.image,req.session.user[0].id], (err) => {
        if (!err) {
            req.session.user[0].name = req.body.name;
            req.session.user[0].email = req.body.email;
            req.session.user[0].phone = req.body.phone;
            req.session.user[0].image = req.body.image;
            res.redirect('/info');
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
            res.json({msg:'success'});  
        }
        else {
            res.json({msg:err});  
        }          
    });
}