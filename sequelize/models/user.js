const { DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('User', {
    // This id attribute is default, but I wanted to explicitly define it for clarity
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      unque: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Must be a valid email address"
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
      type: DataTypes.STRING
    },
  });

  // One way to add more functions
  sequelize.models.User.prototype.withListsCount = function() {
    return sequelize.models.WishList.count({
      where: {
        UserId: this.id
      }
    })
  }
};