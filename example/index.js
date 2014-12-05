process.stdout = {};

var logger = require('fax-logger');
var fax = require('..');
require('setimmediate');

var app = fax();
app.use(logger());

app.send({url: 'http://api.github.com'});
