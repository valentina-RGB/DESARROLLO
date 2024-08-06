module.exports = (sequelize, DataTypes) => {

    const Producto_Pedidos = sequelize.define('Producto_Pedidos', {
    ID_producto_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ID_pedidos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Pedidos',
          key: 'ID_pedido',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    ID_productos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'Productos',
        key: 'ID_producto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_neto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precio_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    }, {
    tableName: 'Producto_Pedidos',
    timestamps: false,
    });

    // Producto_Pedidos.associate = function(models) { 
    // Producto_Pedidos.hasMany(models.Pedidos, { foreignKey: 'ID_pedido' });
    // Producto_Pedidos.hasMany(models.Productos, {foreignKey: 'ID_producto' });
    // };

    Producto_Pedidos.associate = function(models) {
        Producto_Pedidos.belongsTo(models.Pedidos, { foreignKey: 'ID_pedido' });
        Producto_Pedidos.belongsTo(models.Productos, { foreignKey: 'ID_producto' });
    };


    return Producto_Pedidos;
};