"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worldcup_choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Worldcups, {
        targetKey: "worldcup_id",
        foreignKey: "worldcup_id",
      });

      this.belongsTo(models.Worldcup_results, {
        targetKey: "worldcup_choice_id",
        foreignKey: "worldcup_choice_id",
      });
    }
  }
  Worldcup_choices.init(
    {
      worldcup_choice_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      worldcup_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Worldcups",
          key: "worldcup_id",
        },
        onDelete: "CASCADE",
      },
      choice_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      choice_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      win_count: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        defaultValue: DataTypes.NOW,
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: DataTypes.NOW,
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Worldcup_choices",
    }
  );
  return Worldcup_choices;
};
