'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate(models) {
      // define association here
      models.Books.hasMany(models.UserCart, {
        as: "bookCart",
        foreignKey: "bookId",
      });
      models.Books.hasMany(models.UserFavorites, {
        as: "bookFavorites",
        foreignKey: "bookId",
      });

    }
  }
  Books.init({
    ownerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    genre:DataTypes.STRING,
    year: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    publisher: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};