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
    genre: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    releaseDate: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    priceCents: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    coverUrl: {
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
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true
    }
  });
};