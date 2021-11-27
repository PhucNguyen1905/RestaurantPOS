const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

let User;

function convertTime(timeStr) {
    var date = new Date(timeStr);
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + 'T' + 
        ('00' + (date.getUTCHours()+7)).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2);
    return(date);
}

// [GET] /
exports.viewTable = (req, res) => {
    if (!res.locals.user) { return res.redirect('login'); }
    User = res.locals.user;
    res.render('table', {
        title: 'Table Reservation', 
        alert: '',
        status: 'normal',
        user: User,
        convertTime
    });
}

// [POST] /
exports.createReserve = (req, res) => {
    if (!req.user) { return res.redirect('/login'); };
    User = req.user;
    const {numberPeople, message, time} = req.body;
    connection.query('INSERT INTO reserve SET numberPeople=?,message=?, time=?, customerID=?',[numberPeople,message,time, User.id], (err) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve WHERE customerID=? ORDER BY createAt DESC',[User.id], (err, reserveInfors) => {
                if (!err) {
                    res.render('table', {
                        title: 'Table Reservation',
                        status: 'extra',
                        reserveInfor: reserveInfors[0],
                        alert: 'Đặt bàn thành công!',
                        user: User,
                        convertTime
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

// [GET] /reserved
exports.viewReservedTable = (req, res) => {
    if (!req.user) { return res.redirect('/login'); };
    res.render('table-reserved', {
        title: 'Table Reservation',
        status: 'normal',
        alert: '',
        user: req.user,
        convertTime
    });
}

// [POST] /reserved
exports.viewReservedTable = (req, res) => {
    if (!req.user) { return res.redirect('/login'); };
    User = req.user;
    connection.query('SELECT * FROM Reserve WHERE customerID=? ORDER BY time ASC',[User.id], (err, reserveInfors) => {
        if (!err) {
            res.render('table-reserved', {
                title: 'Table Reservation',
                status: 'search',
                reserveInfors: reserveInfors,
                alert: '',
                user: User,
                convertTime
            });
        } else {
            console.log(err);
        }

    });
}

// [POST] /update/:id
exports.updateTable = (req, res) => {
    if (!req.user) { return res.redirect('/login'); };
    User = req.user;
    const {numberPeople, message, time} = req.body;
    connection.query('UPDATE Reserve SET numberPeople=?,message=?, time=? WHERE id=?',[numberPeople,message,time,req.params.id], (err) => {
            if (!err) {
                connection.query('SELECT * FROM Reserve WHERE customerID=? ORDER BY time ASC',[User.id], (err, reserveInfors) => {
                    if (!err) {
                        res.render('table-reserved', {
                            title: 'Table Reservation',
                            status: 'search',
                            reserveInfors: reserveInfors,
                            alert: 'Cập nhật thành công',
                            user: User,
                            convertTime
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

// [GET] /deleteAll
exports.deleteAllTable = (req, res) => {
    if (!req.user) { return res.redirect('/login'); };
    User = req.user;
    connection.query('DELETE FROM Reserve WHERE customerID=?',[User.id], (err) => {
        if (!err) {
            res.render('table-reserved', {
                title: 'Table Reservation',
                status: 'normal',
                alert: 'Hủy tất cả bàn thành công!',
                user: User,
                convertTime
            });
        } else {
            console.log(err);
        }
    });
}

// [GET] /delete/:id
exports.deleteTable = (req, res) => {
    if (!req.user) { return res.redirect('/login'); };
    User = req.user;
    connection.query('DELETE FROM Reserve WHERE id=?',[req.params.id], (err) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve WHERE customerID=? ORDER BY time ASC',[User.id], (err, reserveInfors) => {
                if (!err) {
                    res.render('table-reserved', {
                        title: 'Table Reservation',
                        status: 'search',
                        reserveInfors: reserveInfors,
                        alert: 'Hủy bàn thành công',
                        user: User,
                        convertTime
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

    
