var Passport = require('passport').Passport,
    express = require('express');

function Auth(config) {
    var passport = new Passport(),
        router = express.Router();

    if (config.google) {
        var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
		passport.use(new GoogleStrategy(config.google, function(request, accessToken, refreshToken, profile, done) {
			done(null, profile);
		}));
    	router.use(passport.initialize());
    	router.use(passport.session());
    	router.use(passport.authenticate('google', config.google));
	} else if (config.github) {
        var githubStrategy = require( 'passport-github' ).Strategy;
		passport.use(new githubStrategy(config.github, function(accessToken, refreshToken, profile, done) {
			done(null, profile);
		}));
    	router.use(passport.initialize());
    	router.use(passport.session());
    	router.use(passport.authenticate('github', config.github));
	} else if (config.basic) {
    	var http = require('passport-http');
		passport.use(new http.BasicStrategy(function (userid, password, done) {
			if (userid && password && config.basic[userid] === password) {
				done(null, { provider: 'basic', id: userid, displayName: userid });
			} else {
				done(null, false);
			}
		}));
		router.use(passport.authenticate('basic', { session: false }));
	}

    return router;
}

module.exports = Auth;
