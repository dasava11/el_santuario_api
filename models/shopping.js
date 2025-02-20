import Sequelize from 'sequelize';

export default function(sequelize, DataTypes) {
  return sequelize.define('Shopping', {
    id_shopping: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    customer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id_customers'
      }
    },
    payment_method: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    taxes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_sale: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'shopping',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_shopping" },
        ]
      },
      {
        name: "fk_id_customers_idx",
        using: "BTREE",
        fields: [
          { name: "customer" },
        ]
      },
      {
        name: "fk_idUsers_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
