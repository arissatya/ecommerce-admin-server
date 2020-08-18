'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: "Password is required"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};