
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    ID_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Correo: {
      type: DataTypes.STRING(100), // Cambiado a STRING
      allowNull: false,
    },
    telefono: {
      type: DataTypes.BIGINT, // Cambiado a BIGINT, puedes usar STRING si prefieres
      defaultValue: '1234567899',
      unique: true,
      allowNull: true,
    },
    contrasena: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ID_roles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'ID_rol',
      }
    },
    estado_usuario: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
    },
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });

  Usuarios.associate = function (models) {
    Usuarios.hasMany(models.Roles, { foreignKey: 'ID_rol' });
  };

  return Usuarios;
};
