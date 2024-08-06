

module.exports = (sequelize, DataTypes) => {
  const Acceso = sequelize.define('Acceso', {
    ID_acceso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_usuarios: {
      type: DataTypes.INTEGER,
      allowNull:true,
      references: {
      model: 'Usuarios',
        key: 'ID_usuario',
      },
      onUpdate: 'CASCADE',
      OnDelete:'SET NULL'
    }, 
    contrasena: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    tableName: 'Acceso',
    timestamps: false,
  });

   Acceso.associate= function (models) {
   Acceso.hasMany(models.Usuarios, { foreignKey:'ID_usuarios' });
  
    // Acceso.belongsTo(models.Usuarios, { foreignKey: 'ID_usuario' });

   };

  return Acceso;
};