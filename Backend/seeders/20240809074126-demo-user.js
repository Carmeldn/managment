'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {nom: 'Carmel',
        prenom: 'Don',
        email: 'ingabirecarmel11@gmail.com',
        password: '$2b$10$4HJOyzbFxey73YM/CrXkJ.LcGAC1nb6ZNsEak4S5EYBFmQRx97kie', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {nom: 'Chabel',
        prenom: 'Hervé',
        email: 'herve@gmail.com',
        password: '$2b$10$4HJOyzbFxey73YM/CrXkJ.LcGAC1nb6ZNsEak4S5EYBFmQRx97kie', 
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};