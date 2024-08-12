module.exports = (sequelize, DataTypes) => {
    const Ventas = sequelize.define('Ventas', {
      ID_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      ID_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Clientes',
          key: 'ID_cliente', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      precio_total: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ID_estado_venta: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Estado_ventas',
          key: 'ID_estado_venta',
        },
      },
    }, {
      tableName: 'Ventas',
      timestamps: false,
    });
  
    Ventas.associate = (models) => {
      Ventas.belongsTo(models.Clientes, { foreignKey: 'ID_cliente' });  
      Ventas.belongsTo(models.Estado_ventas, { foreignKey: 'ID_estado_venta' });
      Ventas.belongsToMany(models.Productos, { 
        through: 'Producto_Ventas', 
        foreignKey: 'ID_venta', 
        otherKey: 'ID_producto',
        as: 'Productos'
      });
    };
  
    return Ventas;
  };
  