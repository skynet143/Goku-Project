'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facultysubjectassossiations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  facultysubjectassossiations.init({
    subjectId: DataTypes.INTEGER,
    facultiesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'facultysubjectassossiations',
  });
  return facultysubjectassossiations;
};