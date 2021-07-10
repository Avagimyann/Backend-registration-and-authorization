const sequelize = require('../config/db_config');
const {DataTypes} = require("sequelize");
const User = sequelize.define("user", {

    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = User;
