const express = require('express')
const sequelize = require('./sequelize')
const hbs = require('hbs')
const app = express()
const port =  3000
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
var crypto = require('crypto');
var mysql = require('mysql');
var session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


// Collection of all predefined route methods
const routes = {
  userRoutes: require("./routes/userRoutes"),
  homeRoutes: require("./routes/homeRoutes"),
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
app.use(session({
  name: 'geek_text',
  secret: 'interior crocodile alligator',
  resave: true,
  saveUninitialized: false
}));

// Inititalize PassportJS library
app.use(passport.initialize());
app.use(passport.session());

// Session serialization
passport.serializeUser(function(user, done) {
  done(null, {id: user.id, email: user.email, role: user.role});
});

passport.deserializeUser(function(user, done) {
  done(null, {id: user.id, email: user.email, role: user.role});
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.msg = req.flash('error')
  next();
});

app.use(function (req, res, next) {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  console.log(res.locals.user);
  next();
});


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
  // const homeRoutes = require("./routes/homeRoutes")
  // app.use('/', homeRoutes)



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

init();
