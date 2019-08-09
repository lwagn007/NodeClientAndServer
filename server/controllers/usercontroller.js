var express = require("express");

// anything accessed through the variable router is a express method. 
var router = express.Router();

var UserService = require("../middleware/userservice");

router.post("/createuser", function (request, response) {

    let service = new UserService;

    let user = service.createUser(request.body);

    console.log(JSON.stringify(user));

    if (user !== null) {
        response.json(user);
    } else {
        function createError(error){
            response.status(500).send(error.message);
        }
    }

    // User.create({
    //     username: username,
    //     passwordHash: bcrypt.hashSync(password, 10)
    // }).then(
    //     function createSuccess(user) {

    //         var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

    //         response.json({
    //             user: user,
    //             message: "created",
    //             sessionToken: token
    //         });
    //     },
    //     function createError(error) {
    //         response.send(500, error.message);
    //     }
    // );
});

router.post("/login", function (request, response) {

    User.findOne({ where: { username: request.body.user.username } }).then(
        function (user) {
            if (user) {
                bcrypt.compare(request.body.user.password, user.passwordHash, function (error, matches) {
                    if (matches) {
                        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        response.json({
                            user: user,
                            message: "You are logged in",
                            sessionToken: token
                        });
                    } else {
                        response.status(502).send({ error: "Failed password check" });
                    }
                });
            } else {
                response.status(500).send({ error: "failed attempt" });
            }
        },
        function (error) {
            response.status(501).send({ error: "failed" });
        }
    );
});

module.exports = router;