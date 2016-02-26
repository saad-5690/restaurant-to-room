var express = require('express');
var router = express.Router();

/* GET orders list. */
router.get('/', function(req, res, next) {
    var vm = { 
        title: 'Place an order',
        firstName: req.user ? req.user.firstName : null
    };
    res.render('orders/index', vm);
});

module.exports = router;
