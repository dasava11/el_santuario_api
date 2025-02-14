import Sequelize from 'sequelize';
export default function(sequelize, DataTypes) {
  return sequelize.define('UserType', {
    id_userType: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rol: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_userType" },
        ]
      },
    ]
  });
};
