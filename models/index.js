const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
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
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//---------------------------GRAABIT SECTION--------------------------------------------------

//new models GRAABIT
db.client = require("./client.model")(sequelize, Sequelize);
db.ticket = require("./ticket.model")(sequelize, Sequelize);
db.developer = require("./developer.model")(sequelize, Sequelize);
db.statuscatalog = require("./statuscatalog.model")(sequelize, Sequelize)

//new realtionships Tickets ADN

db.client.hasMany(db.ticket, { as: "tickets" });
db.ticket.belongsTo(db.client, {
  foreignKey: "clientId",
  as: "client"
});


db.statuscatalog.hasMany(db.ticket, { as: "tickets" })
db.ticket.belongsTo(db.statuscatalog, {
  foreignKey: "statusCatalogId",
  as: "status"
});
// db.statuscatalog.hasMany(db.ticket);




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

db.ROLES = ["user", "admin", "moderator", "premium"];

module.exports = db;