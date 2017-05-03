(function () {

  /*jshint node:true*/
  'use strict';

  var express = require('express');
  var app = express();
  var cors = require('cors');
  var path = require('path');
  var bodyParser = require('body-parser');
  var favicon = require('serve-favicon');
  var port = process.env.PORT || 1337;

  var environment = process.env.NODE_ENV;
  app.use(express.static(__dirname + "/"));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

//app.options('*', cors()); // include before other routes

app.use(cors({origin: 'http://10.0.45.143:1337'}));

  console.log('About to initialize the node');
  console.log('PORT=' + port);
  console.log('NODE_ENV=' + environment);

  switch (environment) {
    case 'staging':
      console.log(' STAGING ');
      app.use(express.static(path.join(__dirname, 'dist')));
      app.use(favicon(path.join(__dirname, 'dist/favicon.ico')));
      // Any deep link calls should return index.html
      app.use('/*', express.static(path.join(__dirname, '/dist/index.html')));
      break;

    default:
      console.log(' DEV ');

      app.use(express.static(__dirname + '/dist/'));
      app.use(express.static(__dirname + "/"));
      app.use(favicon(__dirname + '/dist/favicon.ico'));
      // Any deep link calls should return index.html
      app.use('/', express.static(__dirname + '/dist/index.html'));
      break;
  }

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://10.0.45.143:3080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

  app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
      '\n__dirname = ' + __dirname +
      '\nprocess.cwd = ' + process.cwd());
  });
})();
