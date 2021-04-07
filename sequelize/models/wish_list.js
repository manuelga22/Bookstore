const { Model, DataTypes } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('WishList', {
    // This id attribute is default, but I wanted to explicitly define it for clarity
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  // One way to add more functions
  sequelize.models.WishList.prototype.items = function() {
    return sequelize.models.WishListItem.findAll({
      where: {
        WishListId: this.id
      }
    })
  }
}