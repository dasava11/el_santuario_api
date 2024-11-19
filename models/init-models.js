var DataTypes = require("sequelize").DataTypes;
var _customers = require("./customers");
var _detail_purchases = require("./detail_purchases");
var _detail_shopping = require("./detail_shopping");
var _products = require("./products");
var _purchases = require("./purchases");
var _shopping = require("./shopping");
var _suppliers = require("./suppliers");
var _user_type = require("./user_type");
var _users = require("./users");

function initModels(sequelize) {
  var customers = _customers(sequelize, DataTypes);
  var detail_purchases = _detail_purchases(sequelize, DataTypes);
  var detail_shopping = _detail_shopping(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var purchases = _purchases(sequelize, DataTypes);
  var shopping = _shopping(sequelize, DataTypes);
  var suppliers = _suppliers(sequelize, DataTypes);
  var user_type = _user_type(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  shopping.belongsTo(customers, { as: "customer_customer", foreignKey: "customer"});
  customers.hasMany(shopping, { as: "shoppings", foreignKey: "customer"});
  detail_purchases.belongsTo(products, { as: "id_products_product", foreignKey: "id_products"});
  products.hasMany(detail_purchases, { as: "detail_purchases", foreignKey: "id_products"});
  detail_shopping.belongsTo(products, { as: "id_products_product", foreignKey: "id_products"});
  products.hasMany(detail_shopping, { as: "detail_shoppings", foreignKey: "id_products"});
  detail_purchases.belongsTo(purchases, { as: "id_purchase_purchase", foreignKey: "id_purchase"});
  purchases.hasMany(detail_purchases, { as: "detail_purchases", foreignKey: "id_purchase"});
  detail_shopping.belongsTo(shopping, { as: "id_shopping_shopping", foreignKey: "id_shopping"});
  shopping.hasMany(detail_shopping, { as: "detail_shoppings", foreignKey: "id_shopping"});
  purchases.belongsTo(suppliers, { as: "id_purchases_supplier", foreignKey: "id_purchases"});
  suppliers.hasOne(purchases, { as: "purchase", foreignKey: "id_purchases"});
  users.belongsTo(user_type, { as: "type_user_user_type", foreignKey: "type_user"});
  user_type.hasMany(users, { as: "users", foreignKey: "type_user"});
  shopping.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(shopping, { as: "shoppings", foreignKey: "userId"});

  return {
    customers,
    detail_purchases,
    detail_shopping,
    products,
    purchases,
    shopping,
    suppliers,
    user_type,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
