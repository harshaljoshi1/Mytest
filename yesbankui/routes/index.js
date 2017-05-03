var express = require('express');
var router = express.Router();
var session		=	require('express-session');
var bodyParser  	= 	require('body-parser');
var app			=	express();


var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess=req.session;
  if(sess.username){
    res.redirect('/stats');
  }
  else{
  res.redirect('/login');//show login page
  }
});

router.post('/login', function(req, res, next) {
  //var username=req.body.username;
  //var password=req.body.password;
  sess=req.session;
  sess.username=req.body.username;
  sess.password=req.body.password;

});

module.exports = router;
