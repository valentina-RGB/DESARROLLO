module.exports = (sequelize, DataTypes) => {
    const Producto_Ventas = sequelize.define('Producto_Ventas', {
      ID_producto_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_ventas: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cambiado a false si es necesario
        references: {
          model: 'Ventas',
          key: 'ID_Venta', // Asegúrate de que esto coincide con la definición en la tabla Ventas
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ID_productos: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cambiado a false si es necesario
        references: {
          model: 'Productos',
          key: 'ID_producto', // Asegúrate de que esto coincide con la definición en la tabla Productos
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio_neto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {
      tableName: 'Producto_Ventas',
      timestamps: false,
    });
  
    return Producto_Ventas;
  };
  