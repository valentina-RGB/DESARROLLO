module.exports = (sequelize, DataTypes) => {
    const Tipo_insumos = sequelize.define('Tipo_insumos', {
      ID_tipo_insumo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      descripcion_tipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'Tipo_insumos',
      timestamps: false,
    });

      Tipo_insumos.associate = function(models) {
      Tipo_insumos.belongsTo(models.Insumos, { foreignKey: 'ID_insumo' });
    };
  
    return Tipo_insumos;
  };