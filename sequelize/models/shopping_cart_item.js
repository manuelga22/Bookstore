const { DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('ShoppingCartItem', {
    // This id attribute is default, but I wanted to explicitly define it for clarity
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		user_id: {
			allowNull: false,
			type: DataTypes.INTEGER
    },
    book_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
    quantity: {
			allowNull: false,
			type: DataTypes.INTEGER
    },
    deferred: {
      allowNull: false,
      default: false,
			type: DataTypes.TINYINT
    },
    purchased_at: {
			allowNull: true,
			type: DataTypes.DATE
    },
    credit_card_id: {
			allowNull: true,
			type: DataTypes.INTEGER
		},
		shipping_address_id: {
			allowNull: true,
			type: DataTypes.INTEGER
		}
	});
};
