const { DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Rating', {
    // This id attribute is default, but I wanted to explicitly define it for clarity
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		book_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		user_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
    score: {
			allowNull: true,
			type: DataTypes.INTEGER
    },
    comment: {
			allowNull: true,
			type: DataTypes.STRING
    },
    anonymous: {
      allowNull: false,
      default: false,
			type: DataTypes.TINYINT
		},
	});
};