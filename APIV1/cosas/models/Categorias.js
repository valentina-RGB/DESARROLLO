module.exports = (sequelize, DataTypes) => {
  
  const Categorias = sequelize.define('Categorias', {
    ID_categoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),   
    },
    estado_categoria: {
      type: DataTypes.CHAR(1),
      defaultValue: 'A',
    },
    imagen: {
      type: DataTypes.STRING(100),
    },
  }, {
    tableName: 'Categorias',
    timestamps: false,
  });

  return Categorias;
};