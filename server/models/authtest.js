module.exports = function(sequelize, DataTypes) {
    return sequelize.define("authtestdata", {
        authtestdata: DataTypes.STRING,
        // Owner is a foreign key
        owner: DataTypes.INTEGER
    });
};