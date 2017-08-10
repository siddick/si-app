var meddleware = require('meddleware'),
    _ = require('lodash'),
    config = require('../config/middleware.json');

try {
    var newConfig = require(process.cwd() + '/config/middleware.json');
    config = _.extend(config, newConfig);
} catch (err) {
    console.error(err);
}

module.exports = function (userConfig) {
    return meddleware(_.extend(config, userConfig));
};
