
module.exports = (sequelize, DataTypes) => {
    const Insumos = sequelize.define('Insumos', {
      ID_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // ID_tipo_insumo: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Tipo_insumos',
      //     key: 'ID_tipo_insumo',
      //   },
      // },
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
      Insumos.hasMany(models.HistorialEntradas, { foreignKey: 'ID_insumo' })
      Insumos.belongsTo(models.Insumos, { foreignKey: 'ID_insumo' });
      // Insumos.hasMany(models.Tipo_insumos, {foreignKey: 'ID_tipo_insumo',as: 'Tipos_insumos', });
    };
  
    return Insumos;
  };
  