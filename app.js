const express = require('express')
const sequelize = require('./sequelize')
const hbs = require('hbs')
const app = express()
const port = 3000


//middleware
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

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