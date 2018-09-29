//Router: /api/groups/

var express = require('express');
var router = express.Router();
Group = require('../models/group');

router.get('/date/:date/range/:range', function(req,res){
    Group.getTopGroups(req.params.date, req.params.range, 50, function(err, groups){
        if(err){
            throw err;
        }
        res.json(groups)
    });
});

router.get('/userID/:id', function(req,res){
    Group.getUserGroup(req.params.id, function(err, groupID){
        if(err){
            throw err;
        }
        res.json(groupID)
    });
});

module.exports = router;
