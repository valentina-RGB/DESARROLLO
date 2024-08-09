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
            allowNull: false
        },
        ID_cliente: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Clientes',
                key: 'ID',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            comment: 'Por favor ingrese el cliente',
        },
        precio_total: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        ID_estado_venta: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Estado_ventas',
                key: 'ID_estado_venta'
            },
        },
    },{
        tableName: 'Ventas',
        timestamps: false,
    });

    Ventas.associate = function(models) {
        Ventas.belongsTo(models.Clientes, { foreignKey: 'ID_cliente', as: 'Cliente' });
        Ventas.belongsTo(models.Estado_ventas, { foreignKey: 'ID_estado_venta' }); // Asociación inversa
        Ventas.belongsToMany(models.Productos, { through: models.Producto_Ventas, foreignKey: 'ID_venta', otherKey: 'ID_producto' });
    }

    return Ventas;
};
