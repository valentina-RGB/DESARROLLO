module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
    ID_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // ID_usuario: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'Usuarios', // Nombre de la tabla relacionada
    //     key: 'ID_usuario', // Nombre de la columna en la tabla relacionada
    //   }
    // },
    // ID_rol: {
    //   type: DataTypes.STRING(100),
    //   unique: true,
    //   allowNull: false,
    //   references: {
    //     model: 'Roles', // Nombre de la tabla relacionada
    //     key: 'ID_rol', // Nombre de la columna en la tabla relacionada
    //   }
    // },
    estado_usuario: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
    },
  }, {
    tableName: 'Clientes',
    timestamps: false,
  });

  

  return Clientes;
};
