module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        username: DataTypes.STRING,
        passwordHash: DataTypes.STRING
    });
};