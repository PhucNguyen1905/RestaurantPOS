const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// View table
exports.viewTable = (req, res) => {
    res.render('table', {
        title: 'Table', 
        alert: '',
        status: 'normal'
    });
}

exports.createReserve = (req, res) => {
    const {customerName, customerPhone, numberPeople, message, time} = req.body;
    connection.query('INSERT INTO reserve SET customerName=?,customerPhone=?, numberPeople=?,message=?, time=?, id=?',[customerName,customerPhone,numberPeople,message,time,req.params.id], (err) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve WHERE customerPhone=? ORDER BY createAt DESC',[customerPhone], (err, reserveInfors) => {
                if (!err) {
                    res.render('table', {
                        title: 'Table',
                        status: 'extra',
                        reserveInfor: reserveInfors[0],
                        alert: 'Reserve successfully!'
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

// View rud Table
exports.rudTable = (req, res) => {
    res.render('rudTable', {
        title: 'rudTable',
        status: 'normal',
        alert: ''
    });
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}

exports.viewTableSearch = (req, res) => {
    const {searchPhone} = req.body;
    connection.query('SELECT * FROM Reserve WHERE customerPhone=? ORDER BY time ASC',[searchPhone], (err, reserveInfors) => {
        if (!err) {
            res.render('rudTable', {
                title: 'rudTable',
                status: 'search',
                reserveInfors: reserveInfors,
                alert: ''
            });
        } else {
            console.log(err);
        }

    });
}

exports.updateTable = (req, res) => {
    const {numberPeople, message, time} = req.body;
    connection.query('UPDATE Reserve SET numberPeople=?,message=?, time=? WHERE id=?',[numberPeople,message,time,req.params.id], (err) => {
            if (!err) {
                connection.query('SELECT * FROM Reserve WHERE customerPhone=? ORDER BY time ASC',req.params.phone, (err, reserveInfors) => {
                    if (!err) {
                        res.render('rudTable', {
                            title: 'rudTable',
                            status: 'search',
                            reserveInfors: reserveInfors,
                            alert: 'Update Successfully'
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

exports.updateNamePhone = (req, res) => {
    const {customerName, customerPhone} = req.body;
    connection.query('UPDATE Reserve SET customerName=?,customerPhone=? WHERE customerPhone=?',[customerName,customerPhone,req.params.phone], (err) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve WHERE customerPhone=? ORDER BY time ASC',[customerPhone], (err, reserveInfors) => {
                if (!err) {
                    res.render('rudTable', {
                        title: 'rudTable',
                        status: 'search',
                        reserveInfors: reserveInfors,
                        alert: 'Update Successfully'
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

exports.deleteAllTable = (req, res) => {
    connection.query('DELETE FROM Reserve WHERE customerPhone=?',[req.params.phone], (err) => {
        if (!err) {
            res.render('rudTable', {
                title: 'rudTable',
                status: 'normal',
                alert: 'Delete Successfully'
            });
        } else {
            console.log(err);
        }

    });
}

exports.deleteTable = (req, res) => {
    connection.query('DELETE FROM Reserve WHERE id=?',[req.params.id], (err) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve WHERE customerPhone=? ORDER BY time ASC',[req.params.phone], (err, reserveInfors) => {
                if (!err) {
                    res.render('rudTable', {
                        title: 'rudTable',
                        status: 'search',
                        reserveInfors: reserveInfors,
                        alert: 'Delete Successfully'
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

exports.managerTable = (req, res) => {
    connection.query('SELECT * FROM Reserve', (err, tables) => {
        if (!err) {
            res.render('admin/table', {
                hidden: 'hidden',
                messages: '',
                title: 'Table manager',
                tables: tables
            })
        } else {
            console.log(err);
        }

    });
    
}

// [GET] /managerDelete/:id
exports.managerDeleteTable = (req, res) => {
    connection.query('DELETE FROM Reserve WHERE id=?',[req.params.id], (err) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve', (err, tables) => {
                if (!err) {
                    res.render('admin/table', {
                        hidden: 'hidden',
                        messages: '',
                        title: 'Table manager',
                        tables: tables
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


// [POST] /managerResponse/:id
exports.managerTableResponse = (req, res) => {
    connection.query('UPDATE Reserve SET managerFeedback=? , status=? WHERE id=?',[req.body.content, req.body.status, req.params.id], (err, tables) => {
        if (!err) {
            connection.query('SELECT * FROM Reserve', (err, tables) => {
                if (!err) {
                    res.render('admin/table', {
                        hidden: 'hidden',
                        messages: '',
                        title: 'Table manager',
                        tables: tables
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
    
