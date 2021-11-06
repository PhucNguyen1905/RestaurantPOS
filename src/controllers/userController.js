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
    connection.query("SELECT * FROM food WHERE id = ?", [req.params.id], (err, dishes) => {
        if (!err) {
            res.render('food_detail', {
                title: dishes[0].name,
                category: getCategory(dishes[0].categories),
                dish: dishes[0]
            })
        } else {
            console.log(err);
        }

    });

};


// View menu
exports.viewMenu = (req, res) => {
    connection.query('SELECT * FROM food', (err, rows) => {
        // When done with the connection, release it
        if (!err) {
            res.render('menu', {
                rows: rows,
                title: 'Menu'
            });
        } else {
            console.log(err);
        }

    });
}

// View menu by Filter
exports.viewMenuFilter = (req, res) => {
    let cat = req.body.category;
    let categories = ['Món chính', 'Khai vị', 'Tráng miệng', 'Nước uống', 'Tất cả'];
    if (cat == 4) {
        connection.query('SELECT * FROM food', (err, rows) => {
            if (!err) {
                res.render('filter_menu', {
                    rows: rows,
                    title: 'Tất cả',
                    categories: categories
                });
            } else {
                console.log(err);
            }

        });
    }
    else {
        connection.query('SELECT * FROM food WHERE categories = ?', [cat], (err, rows) => {
            if (!err) {
                res.render('filter_menu', {
                    rows: rows,
                    title: getCategory(cat),
                    categories: categories
                });
            } else {
                console.log(err);
            }

        });
    }
}

// View menu by Search
exports.viewMenuSearch = (req, res) => {
    let search = req.body.search;
    connection.query('SELECT * FROM food WHERE name LIKE ?', '%' + [search] + '%', (err, rows) => {
        if (!err) {
            res.render('menu', {
                rows: rows,
                title: 'Menu'
            });
        } else {
            console.log(err);
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