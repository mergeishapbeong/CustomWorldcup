"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class worldcup_results extends Model {
    static associate(models) {
      // define association here
    }
  }
  worldcup_results.init(
    {
      worldcup_result_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      worldcup_choice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Worldcup_choices",
          key: "worldcup_choice_id",
        },
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Users 모델을 참조합니다.
          key: "user_id", // Users 모델의 userId를 참조합니다.
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.fn("now"),
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "worldcup_results",
    }
  );
  return worldcup_results;
};
