const Sequelize = require("sequelize");
const sequelize = new Sequelize('echomunchapi', 'root', '', {
  host: "localhost",
  dialect: "mysql",
  port: 3308
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./recipe.model.js")(sequelize, Sequelize);

module.exports = db;