const passport = require('passport');

class Auth {
  static signIn(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.send({
          status: false,
          message: info.message
        });
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({
          status: true,
          message: 'Аутентификация прошла успешно',
          session: req.session
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
