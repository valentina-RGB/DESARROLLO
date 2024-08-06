module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
    ID_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
