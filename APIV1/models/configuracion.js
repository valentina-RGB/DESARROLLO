module.exports = (sequelize,DataTypes) => {
  
  const Configuraciones = sequelize.define('Configuraciones', {
    ID_configuracion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true,
      
    },
    ID_insumo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Insumos',
          key: 'ID_insumo',
        },
      },
  }, {
    tableName: 'Configuraciones',
    timestamps: false,
  });
  
  Configuraciones.associate = function(models) {
    Configuraciones.hasMany(models.Insumos, { foreignKey: 'ID_insumo' });
  };

  return Configuraciones;
};