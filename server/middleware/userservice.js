require("dotenv").config();
var sequelize = require("../db");

//anything accessed through variable User is a sequelize method.
var User = sequelize.import("../models/user.js");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

class UserService {

    createUser(request) {
        let username = request.user.username;
        let password = request.user.password;

        if(User.findOne({where: {username: request.user.username }})){
            return "400";
        }

        User.create({
            username: username,
            passwordHash: bcrypt.hashSync(password, 10)
        }).then(
            function createSuccess(user) {
                var token = jwt.sign({ id: user.id },
                    process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                user = {
                    user: user,
                    message: "created",
                    sessionToken: token
                };
                //console.log(user);
                return JSON.stringify(user);
            },
            function createError(error) {
                return error.message;
            }
        );
    }
}

module.exports = UserService;