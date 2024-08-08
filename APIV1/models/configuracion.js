module.exports = (sequelize,DataTypes) => {
  const Configuraciones = sequelize.define('Configuraciones', {
    
    ID_configuracion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true   
    },
    ID_insumos: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Insumos',
          key: 'ID_insumo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
  }, {
    tableName: 'Configuraciones',
    timestamps: false
  });  
  return Configuraciones;
};