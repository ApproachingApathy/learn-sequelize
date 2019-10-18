'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([
      queryInterface.addColumn(
      'Users',
      'first_name',
      {
        type: Sequelize.STRING,
        allowNull: true
     }),
      queryInterface.addColumn(
        'Users',
        'last_name',
        {
          type: Sequelize.STRING,
          allowNull: true
      }),
      queryInterface.addColumn(
        'Users',
        'user_flair',
        {
          type: Sequelize.STRING,
          allowNull: true
      }),
  ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   Promise.all([
     queryInterface.removeColumn('Users', "first_name"),
     queryInterface.removeColumn("Users", "last_name"),
     queryInterface.removeColumn("Users", "user_flair"),
   ])
  }
};
