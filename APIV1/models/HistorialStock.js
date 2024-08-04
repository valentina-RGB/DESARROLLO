// models/HistorialStock.js
module.exports = (sequelize, DataTypes) => {
  const HistorialStock = sequelize.define('HistorialStock', {
    ID_historial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Insumos',
        key: 'ID_insumo',
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'Historial_stock',
    timestamps: false,
  });

  HistorialStock.associate = function(models) {
    HistorialStock.belongsTo(models.Insumos, { foreignKey: 'ID_insumo' });
  };

  return HistorialStock;
};
