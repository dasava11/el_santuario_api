const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detail_purchases', {
    id_detail_purchases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_purchase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'purchases',
        key: 'id_purchases'
      }
    },
    id_products: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id_products'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    value_taxes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detail_purchases',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_detail_purchases" },
        ]
      },
      {
        name: "fk_id_purchases_idx",
        using: "BTREE",
        fields: [
          { name: "id_purchase" },
        ]
      },
      {
        name: "fk_id_product_idx",
        using: "BTREE",
        fields: [
          { name: "id_products" },
        ]
      },
    ]
  });
};
