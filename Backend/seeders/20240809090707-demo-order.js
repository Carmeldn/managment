'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders',[
      {
        customer_id: 14,
        product_id: 47,
        quantity:10,
        total_amount:350000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customer_id: 14,
        product_id: 47,
        quantity:5,
        total_amount:175000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

   down: async (queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('orders',null,{})
  }
};
