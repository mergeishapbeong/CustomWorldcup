"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worldcup_results extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Worldcup_choices, {
        sourceKey: "worldcup_choice_id",
        foreignKey: "worldcup_choice_id",
      });

      this.belongsTo(models.Users, {
        targetKey: "user_id",
        foreignKey: "user_id",
      });
    }
  }
  Worldcup_results.init(
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
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Worldcup_results",
    }
  );
  return Worldcup_results;
};
