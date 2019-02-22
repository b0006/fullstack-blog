const express = require('express');
// const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const models = require('./database/models');

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');

const articleApiRouter = require('./routes/api/article');

const app = express();

const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

//load passport strategies
require('./passport')(passport, models.user);

//CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};
app.use(allowCrossDomain);

app.use(cookieParser('punks_not_dead'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

const oneHour = 3600000;
app.use(session({
  secret: 'punks_not_dead',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: new Date(Date.now() + oneHour),
    expires: new Date(Date.now() + oneHour)
  }
}));
app.use(passport.initialize());
app.use(passport.session());


// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
//
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/api/articles/', articleApiRouter);

models.sequelize.sync().then(function() {

  app.listen(port, () => console.log(`Listening on port ${port}`));

  console.log('Nice! Database looks fine');
}).catch(function(err) {
  console.log(err, 'Something went wrong with the Database Update!');
});

