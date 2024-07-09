const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);

db.user.hasMany(db.task, { as: "tasks" });
db.task.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;
