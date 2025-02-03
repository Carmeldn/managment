"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Orders", {
      fields: ["customer_id"],
      type: "foreign key",
      name: "fk_order_customer",
      references: {
        table: "Customers",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Orders", {
      fields: ["product_id"],
      type: "foreign key",
      name: "fk_order_product",
      references: {
        table: "Products",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Orders", "fk_order_customer");
    await queryInterface.removeConstraint("Orders", "fk_order_product");
  },
};
