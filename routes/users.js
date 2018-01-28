
let express = require('express');
let router = express.Router();
let models = require('../models')
let Promise = require('bluebird')
let User = models.Users
let Product = models.Products
module.exports = router

router.get('/:userId', function (req, res, next) {

    var findUser = User.findById(req.params.userId);

    var findProducts = Products.findAll({
        where: {
            buyerId: req.params.userId
        }
    });

    Promise.all([findUser, findProducts])
        .spread(function (user, userProducts) {
            res.render('userProducts', {
                products: userProducts,
                user: user
            });
        })
        .catch(next);

});