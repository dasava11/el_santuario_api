import Sequelize from 'sequelize';

export default function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_type',
        key: 'id_userType'
      }
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "fk_user_type_idx",
        using: "BTREE",
        fields: [
          { name: "type_user" },
        ]
      },
    ]
  });
};
