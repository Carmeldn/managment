'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products',[
      {
        category_id:121,
        nom:'Tomates',
        quantite:'1000',
        prix:3500,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        category_id:122,
        nom:'T-shirt Adidas',
        quantite:'100',
        prix:35000,
        createdAt:new Date(),
        updatedAt:new Date()
      },
    ])
  },

   down:async (queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('Products',null,{})
  }
};
