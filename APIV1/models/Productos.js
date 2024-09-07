module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('Productos', {
    ID_producto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre:{
      type: DataTypes.STRING(100),
      allowNull:true,
      unique: true,
      
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    precio_neto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ID_estado_productos: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Estado_producto',
        key: 'ID_Estado_producto',
      },
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
  },
  {
    indexes: [
      {

        fields: ['ID_estado_productos'] 
      },
      {

        fields: ['ID_categorias']  
      },
      {

        fields: ['ID_tipo_productos'] 
      },
      {
        fields: ['nombre'] 
      }
    ]
  }
);

  Productos.associate = (models) => {

    //Asociación de productos
    Productos.hasMany(models.Tipo_productos, {foreignKey: 'ID_tipo_producto'});
    // Asociación con Ventas
    Productos.belongsToMany(models.Ventas, { 
      through: 'Producto_Ventas', 
      foreignKey: 'ID_productos', 
      otherKey: 'ID_venta',
      as: 'Ventas'
    });
     // Asociación con insumos
     Productos.belongsToMany(models.Insumos, { 
      through: 'Producto_insumos', 
      foreignKey: 'ID_productos_tipo', 
      otherKey: 'ID_insumos_tipo',
      as: 'Insumos'
    });
    

    // Asociación con Pedidos
    Productos.belongsToMany(models.Pedidos, { through: 'Producto_Pedidos', foreignKey: 'ID_productos', otherKey: 'ID_pedidos'
    });
  };

  return Productos;
};
