const { DataTypes } = require('sequelize');
const sequelize = require('../data/db.js');
const Insumo = require('./insumos');

const StockInsumo = sequelize.define('StockInsumo', {
    ID_stock_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    stock_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_max: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_actual: {
        type: DataTypes.INTEGER
    },
    ID_porcion: {
        type: DataTypes.INTEGER
    },
    medida: {
        type: DataTypes.STRING(30)
    },
    unidad: {
        type: DataTypes.INTEGER
    },
    sabor_helado: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'Stock_insumos',
    timestamps: false
});

StockInsumo.belongsTo(Insumo, { foreignKey: 'ID_porcion' });

module.exports = StockInsumo;
