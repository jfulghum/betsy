let express = require('express');
let productRouter = express.Router();
let models = require('../models')
let Promise = require('bluebird')
let User = models.Users
let Product = models.Products
module.exports = productRouter

productRouter.get('/', function (req, res, next) {

    Products.findAll({})
        .then(function (products) {
            res.render('index', {products: products});
        })
        .catch(next);

});

productRouter.get('/search', function (req, res, next) {

    Product.findByTag(req.query.search)
        .then(function (products) {
            res.render('index', {
                products: products
            });
        })
        .catch(next);
});

productRouter.post('/:productTitle', function (req, res, next) {
    Product.update(req.body, {
            where: {
                productTitle: req.params.productTitle
            },
            returning: true
        })
        .spread(function (updatedRowCount, updatedPages) { 
            res.redirect(updatedPages[0].route);
        })
        .catch(next);
});