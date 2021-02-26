// Defines all associations between models
function applyAssociations(sequelize) {
  const { 
    Author,
    Book,
    CreditCard,
    Rating,
    ShippingAddress,
    ShoppingCartItem,
    User,
    WishListItem,
    WishList
  } = sequelize.models;

  Author.hasMany(Book);
  
  Book.belongsTo(Author);
  Book.hasMany(Rating);
  Book.hasMany(ShoppingCartItem);
  Book.hasMany(WishListItem);
  
  CreditCard.hasMany(ShoppingCartItem);
  CreditCard.belongsTo(User);

  Rating.belongsTo(Book);
  Rating.belongsTo(User);

  ShippingAddress.belongsTo(User);
  ShippingAddress.hasMany(ShoppingCartItem);

  ShoppingCartItem.belongsTo(Book);
  ShoppingCartItem.belongsTo(CreditCard);
  ShoppingCartItem.belongsTo(ShippingAddress);
  ShoppingCartItem.belongsTo(User);

  User.hasMany(CreditCard);
  User.hasMany(Rating);
  User.hasMany(ShippingAddress);
  User.hasMany(ShoppingCartItem);
  User.hasMany(WishList);

  WishListItem.belongsTo(Book);
  WishListItem.belongsTo(WishList);

  /*
    A "Super Many-to-Many relationship" which allows deeply-nested
    includes and eager loading.
  */
  Book.belongsToMany(WishList, { through: WishListItem });
  WishList.belongsToMany(Book, { through: WishListItem });

  WishList.belongsTo(User);
  WishList.hasMany(WishListItem);
}

module.exports = { applyAssociations };