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
// Parse request in the middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We do this so we can A) use PUT/DELETE in browser that don't support it
// and B) so we can create links to delete records (e.g. /wish_lists/:id?_method=DELETE)
app.use(function(req, res, next) {
  if (req.query._method == 'PUT') {
    req.method = 'PUT';
    req.url = req.path;
  }
  if (req.query._method == 'DELETE') {
    req.method = 'DELETE';
    req.url = req.path;
  }

  next(); 
});

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

  // Init custom routes in your routes controller by placing them in the constructor()
  /* (new routeController()) causes the route to trigger its constructor, which
     triggers the addition of common page and API routes. The router() method returns
     the route to the middleware. */
  for (let [routeName, routeController] of Object.entries(routes)) {
    app.use('/', (new routeController()).router());
  }

  // See all registered routes (for debugging)
  app.get('/routes', (req, res) => {
    res.send(app._router.stack
        .filter(r => r.route) 
        .map(r => r.route.path))
  })

  // get and post routes
  const homeRoutes = require("./routes/homeRoutes")
  app.use('/', homeRoutes)

  const userRoutes = require("./routes/userRoutes")
  app.use('/', userRoutes)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

init();