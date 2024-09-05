module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define('Permiso', {
    ID_permiso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
     
     
    descripcion: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true, 
    },
  }, 
  {
    tableName: 'Permiso',
    timestamps: false,
  });

  Permiso.associate = function(models) {
    Permiso.hasMany(models.Usuarios, { foreignKey: 'ID_usuario' });
    
    Permiso.belongsTo(models.Usuarios, { foreignKey: 'ID_usuario' });
  };

  return Permiso;
};
