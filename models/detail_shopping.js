const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detail_shopping', {
    id_detail_shopping: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_shopping: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shopping',
        key: 'id_shopping'
      }
    },
    id_products: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id_products'
      }
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value_taxes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detail_shopping',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_detail_shopping" },
        ]
      },
      {
        name: "fk_id_product_idx",
        using: "BTREE",
        fields: [
          { name: "id_products" },
        ]
      },
      {
        name: "fk_shopping_idx",
        using: "BTREE",
        fields: [
          { name: "id_shopping" },
        ]
      },
    ]
  });
};
