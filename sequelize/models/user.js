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
		first_name: {
			allowNull: true,
			type: DataTypes.STRING
    },
    last_name: {
			allowNull: true,
			type: DataTypes.STRING
    },
    address: {
			allowNull: true,
			type: DataTypes.STRING
		},
	});
};