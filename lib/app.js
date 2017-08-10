#!/usr/bin/env node

var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT || 3000);

app.use(require('./index')());

app.listen(port, function (err) {
    if (err) { throw err; }
    console.log('Listening on port:', port);
});
