const Sequelize = require("sequelize");
const sequelize = new Sequelize('echomunchapi', 'root', 'root', {
  host: "localhost",
  dialect: "mysql",
  port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.recipes = require("./recipe.model.js")(sequelize, Sequelize);

module.exports = db;