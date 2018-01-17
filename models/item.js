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
      allowNull: true
       
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false 
    }

  });

  Item.associate = models=>{
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Item.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Item;
};



 