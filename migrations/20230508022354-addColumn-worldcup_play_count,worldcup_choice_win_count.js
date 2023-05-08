'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Worldcups', 'play_count', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.addColumn('Worldcup_choices', 'win_count', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
