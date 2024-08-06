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
  
    return Tipo_insumos;
  };