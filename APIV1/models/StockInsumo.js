module.exports = (sequelize, DataTypes) => {
    const StockInsumos = sequelize.define('StockInsumos', {
      ID_stock_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stock_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock_max: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock_actual: {
        type: DataTypes.INTEGER,
      },
      ID_porcion: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Porciones',
          key: 'ID_porcion',
        },
      },
      ID_insumo: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Insumos',
          key: 'ID_insumo',
        },
      },
      medida: {
        type: DataTypes.STRING(30),
      },
      unidad: {
        type: DataTypes.INTEGER,
      },
      sabor_helado: {
        type: DataTypes.STRING(50),
      },
    }, {
      tableName: 'Stock_insumos',
      timestamps: false,
    });
  
    return StockInsumos;
  };