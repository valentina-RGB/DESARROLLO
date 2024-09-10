module.exports = (sequelize, DataTypes) => {

    const Pedidos_adiciones = sequelize.define('Pedidos_adiciones', {
    ID_pedido_adicion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ID_Productos_a: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'Producto_Pedidos',
        key: 'ID_producto_pedido',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    ID_Insumos_a: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'Insumos',
        key: 'ID_insumo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    }, {
    tableName: 'Pedidos_adiciones',
    timestamps: false,
    });

    
   


    return Pedidos_adiciones;
};