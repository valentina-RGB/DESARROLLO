module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define('Permiso', {
    ID_permiso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_usuarios: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'ID_usuario',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }, 
    contrasena: {
      type: DataTypes.STRING(10),
      allowNull: false,
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
    Permiso.hasMany(models.Usuarios, { foreignKey: 'ID_usuarios' });
    Permiso.belongsTo(models.Usuarios, { foreignKey: 'ID_usuarios' });
  };

  return Permiso;
};
