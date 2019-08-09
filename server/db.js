const Sequelize = require("sequelize");
const sequelize = new Sequelize("workoutlog", "postgres", "Testing1!", {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate()
    .then(
        function () {
            console.log("Connected to database.");
        },
        function (error) {
            console.log(error);
        }
    );

module.exports = sequelize;