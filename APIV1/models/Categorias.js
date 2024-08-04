const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Categorias = sequelize.define('Categorias', {
    ID_categoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    estado_categoria: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
    },
    imagen: {
      type: DataTypes.STRING(100),
    },
  }, {
    tableName: 'Categorias',
    timestamps: false,
  });

  return Categorias;
};