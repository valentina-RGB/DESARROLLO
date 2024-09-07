module.exports = (sequelize, DataTypes) => {
    const Estado_producto = sequelize.define('Estado_producto', {
        ID_estado_producto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        estado: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'Estado_producto',
        timestamps: false,
    });

    Estado_producto.associate = function(models) {
        Estado_producto.hasMany(models.Productos, { foreignKey: 'ID_estado_productos' });
    };

    return Estado_producto;
};
