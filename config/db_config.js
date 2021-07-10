const Sequelize = require("sequelize");
const sequelize = new Sequelize("web_token", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port:3307,
    define:{
        timestamps:false
    }
})
console.log("User connection...")


module.exports = sequelize;
