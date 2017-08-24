var Passport = require('passport').Passport,
    express = require('express'),
    http = require('passport-http');

function Auth(config) {
    var passport = new Passport(),
        router = express.Router(),
        users = (config && config.users) || {};

    passport.use(new http.BasicStrategy(function (userid, password, done) {
        if (userid && password && users[userid] === password) {
            done(null, { provider: 'basic', id: userid, displayName: userid });
        } else {
            done(null, false);
        }
    }));

    // router.use(passport.initialize());
    // router.use(passport.session());
    router.use(passport.authenticate('basic', { session: false }));

    return router;
}

module.exports = Auth;
