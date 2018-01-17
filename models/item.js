module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    title: {
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
    specificBusiness: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true
    }

  });
  return Item;
};



 