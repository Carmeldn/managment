'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('customers',[

    {
      first_name:'INGABIRE',
      last_name:  'Don Carmel',
      phone:'76224475',
      adresse:'Kanyosha',
      
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name:'NDAYIHEREJE',
      last_name:  'Hervé',
      phone:'76224474',
      adresse:'Carama',
      
      createdAt: new Date(),
      updatedAt: new Date()
    },


   ] )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customers', null, {});
  }
};
