const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Roles = sequelize.define('Roles', {
    ID_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_usuario: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'Roles',
    timestamps: false,
  });

  return Roles;
};