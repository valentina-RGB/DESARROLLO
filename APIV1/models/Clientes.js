module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
        ID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        estado_usuario: {
          type: DataTypes.CHAR(1),
          defaultValue: 'A',
        },
        correo: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: true,
        },
        telefono: {
          type: DataTypes.INTEGER(10),
          defaultValue: '1234567899',
          unique: true,
          allowNull: true,
        },
        documento: {
          type: DataTypes.INTEGER(15),
          unique: true,
          defaultValue: '123456789456',
        },
        nombre: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: true,
        },
        direccion: {
          type: DataTypes.STRING(100),
          unique: true,
          allowNull: true,
        },
      }, {
        tableName: 'Clientes',
        timestamps: false,
      });
    
      return Clientes;
    };