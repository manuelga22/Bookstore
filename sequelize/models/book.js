const { DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Book', {
    // This id attribute is default, but I wanted to explicitly define it for clarity
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    author_id: {
			allowNull: false,
      type: DataTypes.INTEGER
		},
    genre: {
			allowNull: false,
			type: DataTypes.TEXT
    },
    release_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    price_cents: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cover_url: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          message: "Must be in URL format"
        }
      }
    },
    publisher: {
      allowNull: true,
      type: DataTypes.STRING
    }
	});
};