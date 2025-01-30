import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('DetailPurchases', {
    id_detail_purchases: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    id_purchases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'purchases',
        key: 'id_purchases'
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
          { name: "id_purchases" },
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
