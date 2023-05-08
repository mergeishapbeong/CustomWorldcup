"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worldcups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        targetKey: "user_id",
        foreignKey: "user_id",
      });

      this.hasMany(models.Likes, {
        sourceKey: "worldcup_id",
        foreignKey: "worldcup_id",
      });

      this.hasMany(models.Comments, {
        sourceKey: "worldcup_id",
        foreignKey: "worldcup_id",
      });

      this.hasMany(models.Worldcup_choices, {
        sourceKey: "worldcup_id",
        foreignKey: "worldcup_id",
      });
    }
  }
  Worldcups.init(
    {
      worldcup_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Users 모델을 참조합니다.
          key: "user_id", // Users 모델의 userId를 참조합니다.
        },
        onDelete: "CASCADE",
      },
      title: {
        allowNull: false,

        type: DataTypes.STRING,
      },
      content: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      likes: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      play_count: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      modelName: "Worldcups",
    }
  );
  return Worldcups;
};
