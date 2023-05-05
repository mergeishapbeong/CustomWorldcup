'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worldcup_choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Worldcup_choices.init({
    worldcup_id: DataTypes.INTEGER,
    choice_name: DataTypes.STRING,
    choice_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Worldcup_choices',
  });
  return Worldcup_choices;
};