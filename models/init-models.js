import { DataTypes } from 'sequelize';
import Customers from './customers.js';
import DetailPurchases from './detail_purchases.js';
import DetailShopping from './detail_shopping.js';
import Products from './products.js';
import Purchases from './purchases.js';
import Shopping from './shopping.js';
import Suppliers from './suppliers.js';
import UserType from './user_type.js';
import Users from './users.js';
import db from '../config/db.js';

function initModels() {
  const customers = Customers(db, DataTypes); // Usamos `db` en lugar de `sequelize`
  const detailPurchases = DetailPurchases(db, DataTypes);
  const detailShopping = DetailShopping(db, DataTypes);
  const products = Products(db, DataTypes);
  const purchases = Purchases(db, DataTypes);
  const shopping = Shopping(db, DataTypes);
  const suppliers = Suppliers(db, DataTypes);
  const userType = UserType(db, DataTypes);
  const users = Users(db, DataTypes);

  shopping.belongsTo(customers, { as: "customer_customer", foreignKey: "customer"});
  customers.hasMany(shopping, { as: "shoppings", foreignKey: "customer"});
  detailPurchases.belongsTo(products, { as: "id_products_product", foreignKey: "id_products"});
  products.hasMany(detailPurchases, { as: "detail_purchases", foreignKey: "id_products"});
  detailShopping.belongsTo(products, { as: "id_products_product", foreignKey: "id_products"});
  products.hasMany(detailShopping, { as: "detail_shoppings", foreignKey: "id_products"});
  detailPurchases.belongsTo(purchases, { as: "id_purchase_purchase", foreignKey: "id_purchase"});
  purchases.hasMany(detailPurchases, { as: "detail_purchases", foreignKey: "id_purchase"});
  detailShopping.belongsTo(shopping, { as: "id_shopping_shopping", foreignKey: "id_shopping"});
  shopping.hasMany(detailShopping, { as: "detail_shoppings", foreignKey: "id_shopping"});
  purchases.belongsTo(suppliers, { as: "id_purchases_supplier", foreignKey: "id_purchases"});
  suppliers.hasOne(purchases, { as: "purchase", foreignKey: "id_purchases"});
  users.belongsTo(userType, { as: "type_user_user_type", foreignKey: "type_user"});
  userType.hasMany(users, { as: "users", foreignKey: "type_user"});
  shopping.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(shopping, { as: "shoppings", foreignKey: "userId"});

  return {
    customers,
    detailPurchases,
    detailShopping,
    products,
    purchases,
    shopping,
    suppliers,
    userType,
    users,
  };
}
export default initModels;
