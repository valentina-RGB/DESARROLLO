module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    ID_rol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
    ID_permisos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Permiso",
        key: "ID_permiso"
      }
    }
  }, {
    tableName: 'Roles',
    timestamps: false,
  });

  Roles.associate = function(models) {
    Roles.hasMany(models.Permiso, { foreignKey: 'ID_permiso' });
  }
  return Roles;
};