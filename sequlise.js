const Sequelize = require("sequelize");
const sequelize = new Sequelize("slm_all_tables_2", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const Attributes = AttributeModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const Properties = PropertyModel(sequelize, Sequelize);
const AttProp = sequelize.define("property_tag", {});

Attributes.belongsToMany(Properties, { through: AttProp, unique: false });
Properties.belongsToMany(Attributes, { through: AttProp, unique: false });

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  Attributes,
  Properties
};
