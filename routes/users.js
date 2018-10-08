//Router: /api/users/

var express = require('express');
var router = express.Router();
User = require('../models/user');

router.get('/',function(req,res){
    User.getUsers(function(err, users){
        if(err){
            throw err;
        }
        res.json(users);
    });
});

router.get('/id/:_id',function(req,res){
    User.getUserById(req.params._id, function(err, user){
        if(err){
            throw err;
        }
        console.log("Someone call a user ID request "+Date.now())
        res.json(user);
    });
});

router.get('/name/:name', function(req,res){
    User.getUserByName(req.params.name, function(err, user){
        if(err){
            throw err;
        }
        console.log(user)
        res.json(user)
    });
});

router.get('/id/:id/getIP', function(req,res){
    ip = parseInt(req.params.id);
    User.getUserIP(ip, function(err, ip){
        if(err){
            throw err;
        }
        res.json(ip)
    })
});

module.exports = router;