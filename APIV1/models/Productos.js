module.exports = (sequelize,DataTypes) => {
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
      references: {
        model: 'tipo_productos',
        key: 'ID_tipo_producto',
      },
    },
    ID_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias',
        key: 'ID_categoria',
      },
    },
    imagen: {
      type: DataTypes.STRING(100),
    },
  }, {
    tableName: 'Productos',
    timestamps: false,
  });

  Productos.associate = (models) => {
    Productos.hasMany(models.Categorias, {foreignKey: 'ID_categoria',as: 'categoria',});
    // Productos.hasMany(models.Producto_Pedidos, { foreignKey: 'ID_producto_pedido' });
    Productos.hasMany(models.Producto_Pedidos, { foreignKey: 'ID_productos' });
    // Productos.belongsTo(models.Tipo_productos, {foreignKey: 'ID_tipo_productos',as: 'tipoProducto',});

  };

  return Productos;
};
