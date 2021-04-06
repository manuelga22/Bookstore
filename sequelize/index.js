const { Sequelize } = require('sequelize');
const { applyAssociations } = require('./associations');

// Set up an environment variable with the connection string (in ~/.bash_profile or ~/.zshrc)
// E.g. export GEEK_TEXT_DB_CONNECTION_URL="mysql://user:pass@127.0.0.1:3306/database_name"
const sequelize = new Sequelize(process.env.GEEK_TEXT_DB_CONNECTION_URL,{password:"1234"});

const modelDefiners = [
  require('./models/author'),
  require('./models/book'),
  require('./models/credit_card'),
  require('./models/rating'),
  require('./models/shipping_address'),
  require('./models/shopping_cart_item'),
  require('./models/saved_for_later'),
  require('./models/user'),
  require('./models/wish_list_item'),
  require('./models/wish_list')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyAssociations(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
