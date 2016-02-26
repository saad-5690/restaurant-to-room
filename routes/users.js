var express = require('express');
var router = express.Router();
var passport = require("passport");
var userService = require("../services/user-service");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/create', function(req, res, next) {
  var vm = {
      title: 'Create an account'
  };
  res.render('users/create', vm);
});

/* POST users form data. */
router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err, next){
    if(err){
      console.log(err);
      var vm = {
          title: 'Create an account',
          input: req.body,
          error: 'Something gone wrong'
      };
      delete vm.input.password;
      return res.render('users/create', vm);
    }
    req.login(req.body, function(err){
      if(err){
        //console.log(err);
        return res.redirect('/');
      }
      res.redirect('/orders');
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res, next){
  res.redirect('/orders');
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
})

module.exports = router;
