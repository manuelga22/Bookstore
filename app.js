const express = require('express')
const sequelize = require('./sequelize')
const hbs = require('hbs')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

// Collection of all predefined route methods
const routes = {
  authors: require('./routes/authors'),
  books: require('./routes/books'),
  credit_cards: require('./routes/credit_cards'),
  ratings: require('./routes/ratings'),
  shipping_addresses: require('./routes/shipping_addresses'),
  shopping_cart_items: require('./routes/shopping_cart_items'),
  users: require('./routes/users'),
  wish_list_items: require('./routes/wish_list_items'),
  wish_lists: require('./routes/wish_lists')
};

//middleware 
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.use(express.static(__dirname + '/public'));
// Parse request in the middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
  return async function(req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  // We define the standard REST APIs for each route
  for (const [routeName, routeController] of Object.entries(routes)) {
    if (new routeController().all !== undefined) {
      app.get(
        `/api/${routeName}`,
        makeHandlerAwareOfAsyncErrors(new routeController().all.bind(routeController))
      );
    }
    if (new routeController().find !== undefined) {
      app.get(
        `/api/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(new routeController().find.bind(routeController))
      );
    }
    if (new routeController().create !== undefined) {
      app.post(
        `/api/${routeName}`,
        makeHandlerAwareOfAsyncErrors(new routeController().create.bind(routeController))
      );
    }
    if (new routeController().update !== undefined) {
      app.put(
        `/api/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(new routeController().update.bind(routeController))
      );
    }
    if (new routeController().destroy !== undefined) {
      app.delete(
        `/api/${routeName}/:id`,
        makeHandlerAwareOfAsyncErrors(new routeController().destroy.bind(routeController))
      );
    }
  }

  // get and post routes
  const homeRoutes = require("./routes/homeRoutes")
  app.use('/', homeRoutes)

  const userRoutes = require("./routes/userRoutes")
  app.use('/', userRoutes)

  // We can define more routes if necessary

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

init();