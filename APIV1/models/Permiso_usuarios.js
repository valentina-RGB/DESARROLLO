
module.exports = (sequelize,DataTypes) => {
    const Permiso_usuarios = sequelize.define('Permiso_usuarios', {
      ID_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_permiso: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        references:{
            model: 'Permiso',
            key: 'ID_permiso',
          }
      },
      estado_usuario: {
        type: DataTypes.CHAR(1),
        defaultValue: 'A',
      },
    }, {
      tableName: 'Permiso_usuarios',
      timestamps: false,
    });
  
      Usuarios.associate = function (models) {
      Usuarios.hasMany(models.Roles, { foreignKey:'ID_permiso'});
      };
    return Permiso_usuarios;
  };