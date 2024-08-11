'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    nom_category: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });

  Category.associate = function (models) {
    
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      allowNull: false,
      onDelete: "RESTRICT",
      as: "products",
    });
  };
  return Category;
}; 