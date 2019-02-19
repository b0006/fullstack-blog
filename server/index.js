const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const models = require('./database/models');

const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');


const app = express();
const port = process.env.PORT || 5000;

//load passport strategies
require('./passport')(passport, models.user);
// For Passport
app.use(session({
  // store: new RedisStore({
  //     url: 'redis://localhost',
  // }),
  secret: 'punks not dead',
  resave: true, // saved new sessions
  saveUninitialized: true, // do not automatically write to the session store
  cookie: {
    maxAge: new Date(Date.now() + 3600000),
    expires: new Date(Date.now() + 3600000)
  }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());


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

models.sequelize.sync().then(function() {

  app.listen(port, () => console.log(`Listening on port ${port}`));

  console.log('Nice! Database looks fine');
}).catch(function(err) {
  console.log(err, 'Something went wrong with the Database Update!');
});

