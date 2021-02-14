const { DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('CreditCard', {
    // This id attribute is default, but I wanted to explicitly define it for clarity
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
    number: {
			allowNull: false,
			type: DataTypes.STRING
    },
    expiration: {
			allowNull: false,
			type: DataTypes.STRING
    },
    cvv: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
	});
};
