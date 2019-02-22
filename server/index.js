const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const models = require('./database/models');

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');

const articleApiRouter = require('./routes/api/article');

const app = express();
//load passport strategies
require('./passport')(passport, models.user);

const passportInit = () => {
  app.use(cookieParser('punks_not_dead'));

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
};

const routeInit = () => {
  app.use('/', homeRouter);
  app.use('/', authRouter);
  app.use('/api/articles/', articleApiRouter);
};

const corsInit = () => {
  //CORS middleware
  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  };
  app.use(allowCrossDomain);
};

const parserRequsetInit = () => {
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({ extended: true }));
};

const appInit = () => {
  corsInit();
  parserRequsetInit();
  passportInit();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
  }

  routeInit();
};

appInit();

const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

models.sequelize.sync().then(function() {

  app.listen(port, () => console.log(`Listening on port ${port}`));

  console.log('Nice! Database looks fine');
}).catch(function(err) {
  console.log(err, 'Something went wrong with the Database Update!');
});

