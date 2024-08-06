const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Acceso = sequelize.define('Acceso', {
    ID_acceso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_usuario: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'Acceso',
    timestamps: false,
  });

  return Acceso;
};