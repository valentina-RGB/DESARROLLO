
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    ID_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100), // Cambiado a STRING
      allowNull: false,
    },
    telefono: {
      type: DataTypes.BIGINT, // Cambiado a BIGINT, puedes usar STRING si prefieres
      defaultValue: '1234567899',
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'ID_rol',
      },
      onDelete: 'CASCADE', // Añadido ON DELETE CASCADE
      onUpdate: 'CASCADE' // Añadido ON UPDATE CASCADE
    },
    estado: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
    },
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });

  Usuarios.associate = function (models) {
    Usuarios.hasMany(models.Roles, {
       foreignKey: 'ID_rol',
       onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
      });
    
  };

  return Usuarios;
};
