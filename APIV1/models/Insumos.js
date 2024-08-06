
module.exports = (sequelize, DataTypes) => {
    const Insumos = sequelize.define('Insumos', {
      ID_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_tipo_insumo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tipo_insumos',
          key: 'ID_tipo_insumo',
        },
      },
      descripcion_insumo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      estado_insumo: {
        type: DataTypes.CHAR(1),
        defaultValue: 'D',
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
      },
    }, {
      tableName: 'Insumos',
      timestamps: false,
    });
  
    Insumos.associate = function(models) {
      Insumos.hasMany(models.HistorialEntradas, { foreignKey: 'ID_insumo' });
    };

    const StockInsumos = require('./StockInsumo'); // Importa el modelo de StockInsumos

  Insumos.afterCreate(async (insumo, options) => {
    try {
      await StockInsumos.create({
        stock_min: 0, // Define valores iniciales o por defecto
        stock_max: 100, // Define valores iniciales o por defecto
        stock_actual: 0, // Define valores iniciales o por defecto
        ID_insumo: insumo.ID_insumo,
        medida: 'unidad', // Define la medida inicial o por defecto
        unidad: 0 // Define la unidad inicial o por defecto
      });
    } catch (error) {
      console.error('Error al crear StockInsumos:', error);
    }
  });
  
    return Insumos;
  };
  