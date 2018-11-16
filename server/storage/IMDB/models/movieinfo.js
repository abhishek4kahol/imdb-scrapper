'use strict';
module.exports = (sequelize, DataTypes) => {
  const movieInfo = sequelize.define('movieInfo', {
    name: DataTypes.STRING,
    summary: DataTypes.STRING,
    director: DataTypes.STRING,
    writer: DataTypes.STRING,
    stars: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  movieInfo.associate = function(models) {
    // associations can be defined here
  };
  return movieInfo;
};