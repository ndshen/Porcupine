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

router.get('/leaders/date/:date/range/:range/groupID/:group_id/internalGroupId/:internalId', function(req,res){
    date = req.params.date;
    range = parseInt(req.params.range);
    groupID = parseInt(req.params.group_id);
    internalID = parseInt(req.params.internalId);
    Group.getGroupLeader(date, range, groupID, internalID, function(err, leaders){
        if (err){
            throw err;
        }
        console.log("leaders"+leaders);
        res.json(leaders);
    });
});

module.exports = router;
