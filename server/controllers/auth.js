const passport = require('passport');

class Auth {
  static signIn(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.send({
          message: info.message,
          status: false
        });
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({
          message: 'Аутентификация прошла успешно',
          session: {
            id: req.sessionID,
            user: req.session.passport.user
          },
          status: true
        });
      });
    })(req, res, next);
  }

  static logout(req, res, next) {
    req.session.destroy(function(err) {
      if (err) { return next(err); }
      return res.send({status: true});
    });
  }
}

module.exports = Auth;
