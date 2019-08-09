var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var TestModel = sequelize.import("../models/test");

/****************************
 * Controller Method 1a#: Simple Response
 */

router.get("/helloclient", function(request, response){
    response.send("This is a message from the server to the client.");
});



/****************************
 * Controller Method 1b#: Simple Response
 */

router.post("/one", function (request, response) {
    response.send("Test went through.");
});

/****************************
 * Controller Method 2#: Persisting Data
 */

router.post("/two", function (request, response) {
    let testData = "Test data for second end point.";

    TestModel.create({
        testdata: testData
    })
    .then(
        dataFromDatabase => {
        response.send("Test went through!");
    });
});

/****************************
 * Controller Method 3#: Persisting Data with req.body
 */

router.post("/three", function (request, response) {
    var testData = request.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        });
    response.send("Test three went through");
    console.log("Test three went through."); //Log happens before data is persisted to DB. 
});

/****************************
 * Controller Method 4#: Persisting Data with req.body
 */

router.post("/four", function (request, response) {
    var testData = request.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message() {
            response.send("Test four went through");
        });
});


/****************************
 * Controller Method 5#: Return data in a promise
 */

router.post("/five", function (request, response) {
    var testData = request.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message(data) {
            response.send(data);
        });
});

/****************************
 * Controller Method 6#: Return data in a promise as JSON
 */

router.post("/six", function (request, response) {
    var testData = request.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message(testdata) {
            response.json({
                testdata: testData
            });
        });
});


/****************************
 * Controller Method 7#: Handle errors
 */
router.post("/seven", function(request, response){
    var testData = request.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    }).then(
        function createSuccess(testdata){
            response.json({
                testdata: testdata
            });
        },
        function createError(error){
            response.send(500, error.message);
        }
    );
});

router.get("/one", function(request, response) {
    TestModel
    .findAll({
       attributes: ["id", "testdata"] 
    })
    .then(
        function findAllSuccess(data) {
            console.log("Controller data:", data);
            response.json(data);
        },
        function findAllError(error){
            response.send(500, error.message);
        }
    );
});


module.exports = router;


/**************************
 * Example test controller
 */


// var express = require("express");
// var router = express.Router();

// router.get("/", function (request, response) {
//     response.send("This is a test route for localhost:3000/test");
// });

// router.get("/about", function (request, response) {
//     response.send("This is a challenge test route for about.");
// });

// router.get("/contact", function (request, response) {
//     let personContact = {
//         username: "Kenneth",
//         email: "kenn@kenn.com"
//     };

//     let personContactTwo = {
//         username: "Paul",
//         email: "paul@paul.com"
//     };

//     let persons = [personContact, personContactTwo];

//     response.send(persons);
// });

// router.get("/projects", function (request, response) {
//     response.send([
//         "Project One",
//         "Project Two",
//         "Project Three"
//     ]);
// });

// router.get("/contacts", function (request, response) {
//     response.send([
//         { name: "Paul", email: "paul@paul.com" },
//         { name: "Kenn", email: "kenn@kenn.com" },
//         { name: "Tom", email: "tom@tom.com" }
//     ]);
// });

// module.exports = router;