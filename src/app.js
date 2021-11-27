const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");
const passport = require('passport');

require("dotenv").config();

const app = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// // Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

// // Express Messages middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//     res.locals.messages = require('express-messages')(req, res);
//     next();
// });

// Set global errors variable
app.locals.errors = null;


// Passport config
require('./config/passport')(passport);
// Passport middlware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', (req, res, next) => {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
})


//Router
const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const paymentRoute = require('./routes/payment');
const adminRoute = require('./routes/admin');
const cashierRoute = require('./routes/cashier');
const tableRoute = require('./routes/table');

app.use('/cashier', cashierRoute);
app.use('/admin', adminRoute);
app.use('/cart', cartRoute);
app.use('/pay', paymentRoute);
app.use('/table', tableRoute);
app.use('/', userRoute);


let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port: " + port);
});
