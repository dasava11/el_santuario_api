import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('Suppliers', {
    id_suppliers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nit: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'suppliers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_suppliers" },
        ]
      },
    ]
  });
};
