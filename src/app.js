const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");

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
app.get('*', (req, res, next) => {
    res.locals.cart = req.session.cart;
    next();
})

//Router
const userRoute = require('./routes/user');
const cartRoute = require("./routes/cart");

app.use('/cart', cartRoute);
app.use('/', userRoute);


let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port: " + port);
});
