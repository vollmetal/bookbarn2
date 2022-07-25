'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFavorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserFavorites.belongsTo(models.Users, {
        as: "user",
        foreignKey: "userId",
      });

      models.UserFavorites.belongsTo(models.Books, {
        as: "book",
        foreignKey: "bookId",
      });
    }
  }
  UserFavorites.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserFavorites',
  });
  return UserFavorites;
};