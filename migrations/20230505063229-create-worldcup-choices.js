"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Worldcup_choices", {
      worldcup_choice_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      worldcup_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Worldcups",
          key: "worldcup_id",
        },
        onDelete: "CASCADE",
      },
      choice_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      choice_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      win_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Worldcup_choices");
  },
};
