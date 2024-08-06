
module.exports = (sequelize,DataTypes) => {
  const Roles = sequelize.define('Roles', {
    ID_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // ID_usuarios: {
    //   type:DataTypes.INTEGER,
    //   allowNull: false,
    //   references:{
    //     Model: 'Usuarios',
    //     key: 'ID_usuario',
    //   }
    // },
  }, {
    tableName: 'Roles',
    timestamps: false,
  });
  // Roles.associate = function (models) {
  // Roles.hasMany(models.Usuarios, { foreignKey:'ID_usuarios'});
  //   };

  return Roles;
};