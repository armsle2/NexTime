module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
       
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  User.associate = models=>{
    User.hasMany(models.Item)
  }
  return User;
};



 