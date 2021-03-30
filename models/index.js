const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const dbpreAlta = new Sequelize(dbConfig.localpre.DB, dbConfig.localpre.USER, dbConfig.localpre.PASSWORD, {
  host: dbConfig.localpre.HOST,
  dialect: dbConfig.localpre.dialect,
  operatorsAliases: false,
  timezone: "-06:00",
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  pool: {
    max: dbConfig.localpre.pool.max,
    min: dbConfig.localpre.pool.min,
    acquire: dbConfig.localpre.pool.acquire,
    idle: dbConfig.localpre.pool.idle
  }
});

const dbAltaCte = new Sequelize(dbConfig.localalta.DB, dbConfig.localalta.USER, dbConfig.localalta.PASSWORD, {
  host: dbConfig.localalta.HOST,
  dialect: dbConfig.localalta.dialect,
  operatorsAliases: false,
  timezone: "-06:00",
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    },
  },
  pool: {
    max: dbConfig.localalta.pool.max,
    min: dbConfig.localalta.pool.min,
    acquire: dbConfig.localalta.pool.acquire,
    idle: dbConfig.localalta.pool.idle
  }
});
const dbpre = {};
dbpre.Sequelize = Sequelize;
dbpre.dbpreAlta = dbpreAlta;
const dbalta = {};
dbalta.Sequelize = Sequelize;
dbalta.dbAltCte = dbAltaCte;
//---------------------------GRAABIT SECTION--------------------------------------------------

//new models GRAABIT
dbpre.client = require("./client.model")(dbpreAlta, Sequelize);
dbalta.vendedor = require("./vendedor.model")(dbAltaCte, Sequelize);

//new realtionships Tickets ADN
//new realtionships GRAABIT
//ORDERS
// //  -->ORDER_DETAIL
// db.order.hasMany(db.order_detail, { as: "orderDetail" });
// db.order_detail.belongsTo(db.order, {
//   foreignKey: "orderId",
//   as: "order"
// });

// // -->ORDER X BRANCHES
// db.branch.hasMany(db.order, { as: "orders" });
// db.order.belongsTo(db.branch, {
//   foreignKey: "branchId",
//   as: "branch"
// });

// db.user.hasMany(db.order_detail, { as: "orderDetail" });

// //  -->GROUP
// db.group.hasMany(db.order, { as: "order" });
// db.order.belongsTo(db.group, {
//   foreignKey: "groupId",
//   as: "group"
// });

// db.user.hasMany(db.group, { as: "group" });
// db.group.belongsTo(db.user, {
//   foreignKey: "ownerId",
//   as: "owner"
// });

//-----------------------END GRAABIT SECTION----------------------------------------

// //User relations
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });

// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// //Videos relations
// db.plans.hasMany(db.videos, { as: "videos" });

// db.videos.belongsTo(db.plans, {
//   foreignKey: "planId",
//   as: "plan"
// });

// //Comments
// db.videos.hasMany(db.comments, { as: "comments" });

// db.comments.belongsTo(db.videos, {
//   foreignKey: "videoId",
//   as: "video"
// });

// //Sections
// db.videos.belongsToMany(db.sections, {
//   through: "section_videos",
//   foreignKey: "videoId",
//   otherKey: "sectionId"
// });

// db.sections.belongsToMany(db.videos, {
//   through: "section_videos",
//   foreignKey: "sectionId",
//   otherKey: "videoId"
// });

// //category
// db.videos.belongsToMany(db.categories, {
//   through: "categories_videos",
//   foreignKey: "videoId",
//   otherKey: "categoryId"
// });

// db.categories.belongsToMany(db.videos, {
//   through: "categories_videos",
//   foreignKey: "categoryId",
//   otherKey: "videoId"
// });

dbpre.ROLES = ["user", "admin", "moderator", "premium"];

module.exports = {
  dbpreAlta: dbpre,
  dbAltCte: dbalta
};