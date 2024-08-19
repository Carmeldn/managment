'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders',[
      {
        customer_id: 24,
        product_id: 66,
        quantity:10,
        total_amount:350000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        customer_id: 25,
        product_id: 65,
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
