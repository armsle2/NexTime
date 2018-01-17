module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    timestamp: false
  });

  Category.associate = models=>{
    Category.hasMany(models.Item)
  }
  return Item;
};



 