module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
       
    },
    category: {
      type: DataTypes.STRING,
      
    },
    
  });
  return Item;
};



 