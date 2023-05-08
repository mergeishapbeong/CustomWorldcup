"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Worldcups", {
      worldcup_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // Users 모델을 참조합니다.
          key: "user_id", // Users 모델의 userId를 참조합니다.
        },
        onDelete: "CASCADE",
      },
      title: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      content: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      likes: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      play_count: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Worldcups");
  },
};
