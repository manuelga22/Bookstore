const express = require('express')
const hbs = require('hbs')
const app = express()
const port = 3000


//middleware
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});



// get and post routes
const homeRoutes = require("./routes/homeRoutes")
app.use('/', homeRoutes)

const userRoutes = require("./routes/userRoutes")
app.use('/', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})