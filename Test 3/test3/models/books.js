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
      Books.belongsTo(models.Author, {
        foreignKey: 'author',
        as: 'author_id'
      });
      Books.belongsTo(models.Publisher, {
        foreignKey: 'publisher',
        as: 'publisher_id'
      });
    }
  }
  Books.init({
    title: DataTypes.STRING,
    publisher: DataTypes.INTEGER,
    author: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};