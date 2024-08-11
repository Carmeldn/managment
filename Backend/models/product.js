"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
          onDelete: "RESTRICT",
        },
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {}
  );

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "categories",
    });

    Product.hasMany(models.Order, {
      foreignKey: {
        name: "product_id",
        allowNull: false,
        onDelete: "RESTRICT",
      },
      as: "orders",
    });
  };

  return Product;
};
