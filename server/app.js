// This is the entry point for the application, all requests and responses funneled through here. 

require("dotenv").config();

var express = require("express");
var app = express();
var sequelize = require("./db");
var bodyParser = require("body-parser");
var test = require("./controllers/testcontroller");
var user = require("./controllers/usercontroller");
var authTest = require("./controllers/authtestcontroller");
var headers = require("./middleware/headers");

sequelize.sync();
app.use(bodyParser.json());
app.use(headers);

// Unprotected routes
app.use("/test", test);
app.use("/api/user", user);

// Protected Routes
app.use(require("./middleware/validate-session"));
app.use("/authtest", authTest);

//the listen method is telling the application what port to run on
app.listen(3000, function () {
    console.log("This function is what is telling the app to run on port 3000");
});