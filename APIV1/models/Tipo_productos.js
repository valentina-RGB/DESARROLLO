const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tipo_productos = sequelize.define('Tipo_productos', {
    ID_tipo_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'Tipo_productos',
    timestamps: false,
  });

  Tipo_productos.associate = (models) => {
  Tipo_productos.belongsTo(models.Productos, {foreignKey: 'ID_tipo_productos'});
  };

  return Tipo_productos;
};