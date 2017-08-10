#!/usr/bin/env node

var express = require('express'),
    meddleware = require('meddleware'),
    _ = require('lodash'),
    config = require('../config/middleware.json'),
    app = express(),
    port = parseInt(process.env.PORT || 3000);

try {
    var newConfig = require(process.cwd() + '/config/middleware.json');
    config = _.extend(config, newConfig);
} catch (err) {
    console.error(err);
}

app.use(meddleware(config));

app.listen(port, function (err) {
    if (err) { throw err; }
    console.log('Listening on port:', port);
});
