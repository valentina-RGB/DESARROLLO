module.exports = (sequelize, DataTypes) => {
    const Pedidos = sequelize.define('Pedidos', {
      ID_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true
      },
      ID_clientes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Clientes',
          key: 'ID_cliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      precio_total: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      ID_estado_pedido: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Estado_pedidos',
          key: 'ID_estado_pedido'
        },
      },
    }, {
      tableName: 'Pedidos',
      timestamps: false,
    });
  
    Pedidos.associate = function(models) {
      Pedidos.belongsTo(models.Clientes, { foreignKey: 'ID_clientes' });
      Pedidos.belongsTo(models.EstadoPedido, { foreignKey: 'ID_estado_pedido' }); // Asegúrate de que el nombre sea consistente
      Pedidos.hasMany(models.Producto_Pedidos, { foreignKey: 'ID_pedidos' });
    };
  
    return Pedidos;
  };
  