
module.exports = (sequelize,DataTypes) => {
    const Permiso_roles = sequelize.define('Permiso_roles', {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      /* ID_rol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        references:{
          model: 'Roles',
          key: 'ID_rol',
        }
      }, */
      ID_permiso: {
        type: DataTypes.INTEGER,
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
      tableName: 'Permiso_roles',
      timestamps: false,
    });
  
      /* Roles.associate = function (models) {
      Roles.hasMany(models.Roles, { foreignKey:'ID_permiso'});
      }; */
    return Permiso_roles;
  };