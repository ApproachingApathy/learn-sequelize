'use strict';
module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define('Show', {
    title: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  Show.associate = function(models) {
    // associations can be defined here
  };
  return Show;
};