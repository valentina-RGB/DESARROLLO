// models/Productos.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Productos = sequelize.define('Productos', {
    ID_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    precio_neto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado_producto: {
      type: DataTypes.STRING(20),
      defaultValue: 'Disponible',
    },
    ID_tipo_productos: {
      type: DataTypes.INTEGER,
    },
    ID_categoria: {
      type: DataTypes.INTEGER,
    },
    imagen: {
      type: DataTypes.STRING(100),
    },
  }, {
    tableName: 'Productos',
    timestamps: false,
  });

  Productos.associate = (models) => {
    Productos.belongsTo(models.Categorias, {
      foreignKey: 'ID_categoria',
      as: 'categoria',
    });
    Productos.belongsTo(models.Tipo_productos, {
      foreignKey: 'ID_tipo_productos',
      as: 'tipoProducto',
    });
  };

  return Productos;
};
