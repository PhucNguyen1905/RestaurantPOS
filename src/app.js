const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine");


require("dotenv").config();

const app = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);


//Router
const routes = require("./routes/user");
app.use("/", routes);


let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port: " + port);
});
