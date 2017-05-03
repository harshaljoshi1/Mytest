(function () {

  /*jshint node:true*/
  'use strict';

  var express = require('express');
  var https = require('https');
  var fs = require('fs');
  var Validator = require( 'validator.js' );
  var app = express();
  var sqlinjection = require('sql-injection');
  app.use(sqlinjection);

  var index = require('./routes/index');//mg
  app.use('/', index);//mg

  var app = express();
  var cors = require('cors');
  var path = require('path');
  var bodyParser = require('body-parser');
  var favicon = require('serve-favicon');
  var port = process.env.PORT || 1337;
  var HOST = process.env.HOST || '';

  var environment = process.env.NODE_ENV;
  app.use(express.static(__dirname + "/"));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({secret: 'bdhcbcjch',saveUninitialized: true,resave: true}));


//app.options('*', cors()); // include before other routes

app.use(cors({origin: 'http://maganiva.co.in:1337'}));

  console.log('About to initialize the node');
  console.log('PORT=' + port);
  console.log('NODE_ENV=' + environment);

  switch (environment) {
	  default:
      console.log(' STAGING ');
      app.use(express.static(path.join(__dirname, 'dist')));
      app.use(favicon(path.join(__dirname, 'dist/favicon.ico')));
      // Any deep link calls should return index.html
      app.use('/*', express.static(path.join(__dirname, '/dist/index.html')));
      break;


  }

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://10.0.102.130:1337');

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

var options = {
   // key  : fs.readFileSync('ssl/key.pem'),
   // ca   : fs.readFileSync('ssl/csr.pem'),
   // cert : fs.readFileSync('ssl/cert.pem')
}


/*http.createServer(options, app).listen(port, HOST, null, function() {
    console.log('Server listening on port %d in %s mode', this.address().port, app.settings.env);
});*/



  app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
      '\n__dirname = ' + __dirname +
      '\nprocess.cwd = ' + process.cwd());
  });
})();
