var jwt = require("jsonwebtoken");
var sequelize = require("../db");
var User = sequelize.import("../models/user.js");

module.exports = function (request, response, next) {
    if (request.method == "OPTIONS") {
        next();
    } else {
        var sessionToken = request.headers.authorization;
        console.log(sessionToken);
        if (!sessionToken) return response.status(403).send({ auth: false, message: "No token provided." });
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (error, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        request.user = user;
                        next();
                    },
                        function () {
                            response.status(401).send({ error: "Not Authorized!" });
                        });
                } else {
                    response.status(400).send({ error: "not authorized" });
                }
            });
        }
    }
};