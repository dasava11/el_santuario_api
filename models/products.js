import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    id_products: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    buy_price: {
      type: DataTypes.DECIMAL(14, 4),
      allowNull: false
    },
    code_earn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DECIMAL(14, 4),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    taxes_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_products" },
        ]
      },
    ]
  });
};
