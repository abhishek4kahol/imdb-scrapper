const express = require('express');
const exhandlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const moviedetails = require('./routes/moviedetails');
var models = require("./storage/IMDB/models");
const app = express();


//View engine setup
app.engine('handlebars', exhandlebars());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, '../public')));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', moviedetails);

models.sequelize.sync().then(() => {
  app.listen(3000, () => {
     console.log('server listening on port: 3000');
  })
});

module.exports = app;