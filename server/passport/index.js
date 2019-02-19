const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
  let User = user;
  let LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    done(null, {
      id: user.id,
      login: user.login
    });
  });

  passport.deserializeUser(function(user, done) {
    User.findByPk(user.id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, login, password, done) {
      let User = user;

      let isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };

      User.findOne({
        where: {
          login: login
        }
      }).then(function(user) {

        if (!user) {
          return done(null, false, {
            message: 'Введенный пользователь не зарегистрирован'
          });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Неверный пароль'
          });
        }

        let userinfo = user.get();
        return done(null, userinfo);

      }).catch(function(err) {
        console.log('Error:', err);
        return done(null, false, {
          message: 'Ой. Неизвестная ошибка авторизации.'
        });
      });
    }
  ));
};
