const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogames', {
    id:{
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey : true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false

    },
    background_image:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    released:{
      type:DataTypes.DATEONLY,
      allowNull:false
      
    },
    rating:{
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        min : 1,
        max : 5
      }
    }

  }, {timestamps : false});
  return Videogame;
};
