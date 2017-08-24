#!/usr/bin/env node

var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT || 3000);

app.use(require('./index')());
app.use(require('./auth')({ users: { test: 'test123' }}));

app.listen(port, function (err) {
    if (err) { throw err; }
    console.log('Listening on port:', port);
});
