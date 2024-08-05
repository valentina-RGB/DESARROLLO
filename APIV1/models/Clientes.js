const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  const Clientes = sequelize.define('Clientes', {
    id: {
      autoIncrement: true,
      primaryKey: true,
    },
    ID_usuario: {
      type: DataTypes.INTEGER,
      referces:{
        Model: 'Usuarios',
        key: 'ID_usuario',
      }
    },
    ID_rol: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      referces:{
        Model: 'Roles',
        key: 'ID_rol',
      }
    },
    estado_usuario: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
    },
  }, {
    tableName: 'Clientes',
    timestamps: false,
  });

  return Clientes;
};