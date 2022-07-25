'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate(models) {
      // define association here
      models.Users.hasMany(models.UserCart, {
        as: "userCart",
        foreignKey: "userId",
      });

      models.Users.hasMany(models.UserFavorites, {
        as: "userFavorites",
        foreignKey: "userId",
      });

    }
  }
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};