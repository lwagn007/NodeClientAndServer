var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user.js");
var AuthTestModel = sequelize.import("../models/authtest.js");

router.post("/create", function (request, response) {
    var owner = request.user.id;
    var authTestData = request.body.authtestdata.item;

    AuthTestModel
        .create({
            authtestdata: authTestData,
            owner: owner
        })
        .then(
            function createSuccess(authtestdata) {
                response.json({
                    authtestdata: authtestdata
                });
            },
            function createError(error) {
                console.log(error);
                response.send(500, error.message);
            }
        );
});

router.get("/getall", function (request, response) {
    var userid = request.user.id;

    AuthTestModel.findAll({
        where: {
            owner: userid
        }
    })
        .then(
            function findAllSuccess(data) {
                response.json(data);
            },
            function findAllError(error) {
                response.send(500, error.message);
            }
        );
});

router.get("/:id", function (request, response) {
    var data = request.params.id;
    var userid = request.user.id;

    AuthTestModel.findOne({
        where: {
            id: data,
            owner: userid
        }
    })
        .then(
            function findOneSuccess(data) {
                response.json(data);
            },
            function findOneError(error) {
                response.status(500, error.message).send();
            }
        );
});

router.put("/update/:id", function (request, response) {
    var data = request.params.id;
    var authtestdata = request.body.authtestdata.item;

    AuthTestModel
        .update({
            authtestdata: authtestdata
        },
            { where: { id: data } })
        .then(
            function updateSuccess(updatedLog) {
                response.json({
                    authtestdata: authtestdata
                });
            },
            function updateError(error) {
                response.send(500, error.message);
            }
        );
});

router.delete("/delete/:id", function (request, response) {
    var data = request.params.id;
    var userid = request.user.id;

    AuthTestModel
        .destroy({
            where: { id: data, owner: userid }
        })
        .then(
            function deleteLogSuccess(data) {
                response.send("Log removed.");
            },
            function deleteLogError(error) {
                response.send(500, error.message);
            }
        );
});

module.exports = router;