const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const env = process.env.NODE_ENV === 'development'
  ? 'development'
  : 'production';
const config = require('../config')[env];

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
  app.use('/api/', articleApiRouter);
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
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

const appInit = () => {
  corsInit();
  parserRequsetInit();
  passportInit();

  if (env === 'production') {
    app.use(express.static('client/build'));

    app.get('/', function(req, res) {
      res.sendFile(path.join('/client/build', 'index.html'));
    });
  }

  routeInit();
};

appInit();

global.APP = {
  log: (msg) => config.debug ? console.log(msg) : null
};
APP.log.debug = (msg) => config.debug ? logger.debug(msg) : null;
APP.log.trace = (msg) => config.debug ? logger.trace(msg) : null;
APP.log.info = (msg) => config.debug ? logger.info(msg) : null;
APP.log.warn = (msg) => config.debug ? logger.warn(msg) : null;
APP.log.error = (msg) => config.debug ? logger.error(msg) : null;
APP.log.fatal = (msg) => config.debug ? logger.fatal(msg) : null;

const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

models.sequelize.sync().then(function() {
  console.log('NODE_ENV:', env);

  app.listen(port, () => console.log(`Listening on port ${port}`));

  console.log('Nice! Database looks fine');
}).catch(function(err) {
  console.log(err, 'Something went wrong with the Database Update!');
});

