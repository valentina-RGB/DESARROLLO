module.exports = (sequelize, DataTypes) => {
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
        model: 'Tipo_productos',
        key: 'ID_tipo_producto',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    ID_categorias: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categorias',
        key: 'ID_categoria',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    imagen: {
      type: DataTypes.STRING(100),
    },
  }, {
    tableName: 'Productos',
    timestamps: false,
  });

  Productos.associate = (models) => {
    // Asociación con Ventas
    Productos.belongsToMany(models.Ventas, { 
      through: 'Producto_Ventas', 
      foreignKey: 'ID_producto', 
      otherKey: 'ID_venta',
      as: 'Ventas'
    });

    // Asociación con Pedidos
    Productos.belongsToMany(models.Pedidos, { 
      through: 'Producto_Pedidos', 
      foreignKey: 'ID_producto', 
      otherKey: 'ID_pedido',
      as: 'Pedidos'
    });
  };

  return Productos;
};
