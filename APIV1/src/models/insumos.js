const { DataTypes } = require('sequelize');
const sequelize = require('../data/db.js');

const Insumo = sequelize.define('Insumo', {
    ID_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_tipo_insumo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion_insumo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    estado_insumo: {
        type: DataTypes.CHAR(1),
        defaultValue: 'D',
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT
    }
}, {
    tableName: 'Insumos',
    timestamps: false
});

module.exports = Insumo;
