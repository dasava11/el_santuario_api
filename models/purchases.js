import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('Purchases', {
    id_purchases: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE(2),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    supplier: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'suppliers',
        key: 'id_suppliers'
      }
    },
    taxes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'purchases',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_purchases" },
        ]
      },
      {
        name: "fk_id_supplier_idx",
        using: "BTREE",
        fields: [
          { name: "supplier" },
        ]
      },
    ]
  });
};




