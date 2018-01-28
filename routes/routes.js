
let express = require('express');
let router = express.Router();
let models = require('../models')
let Promise = require('bluebird')
let Page

router.get('/', function(req,res,next){
    User.findAll({})
    .then(function(users){
        res.render(users){
            res.render('userlist', {users: users});
        })
        .catch(next);
})