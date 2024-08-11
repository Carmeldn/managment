"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Products", {
      fields: ["category_id"],
      type: "foreign key",
      name: "fk_category_product", // nom de la contrainte
      references: {
        table: "Categories",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Products", "fk_category_product");
  },
};
