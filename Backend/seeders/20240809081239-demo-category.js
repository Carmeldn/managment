'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Categories',[
    {
      nom_category:"Alimentaire",
      description:'aliments',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nom_category:"vétements",
      description:'habits',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

   down: async(queryInterface, Sequelize)=> {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
