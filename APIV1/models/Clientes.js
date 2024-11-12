module.exports = (sequelize, DataTypes) => {
  const Clientes = sequelize.define('Clientes', {
        ID_cliente: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        estado_cliente: {
          type: DataTypes.CHAR(1),
          defaultValue: 'A',
        },
        correo_electronico: {
          type: DataTypes.STRING(100),
        
          allowNull: true,
        },
        documento: {
          type: DataTypes.BIGINT,
        
          defaultValue: 123456789456,  
      },
        nombre: {
          type: DataTypes.STRING(100),
        
          allowNull: true,
        },
        direccion: {
          type: DataTypes.STRING(100),
        
          allowNull: true,
        },
      }, {
        tableName: 'Clientes',
        timestamps: false,
      });
    

      Clientes.associate = function(models) {
      Clientes.hasMany(models.Pedidos, { foreignKey: 'ID_clientes' });
      Clientes.hasMany(models.Ventas, { foreignKey: 'ID_clientes' });
      }
      
      return Clientes;
    };