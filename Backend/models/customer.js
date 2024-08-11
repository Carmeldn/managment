"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Order, {
        foreignKey: {
          name: "customer_id",
          allowNull: false,
          onDelete: "RESTRICT",
        },
        as: "orders",
      });
    }
  }

  Customer.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      adresse: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  return Customer;
};
