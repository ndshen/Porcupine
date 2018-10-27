//Router: /api/groups/

var express = require('express');
var router = express.Router();
Group = require('../models/group');
Group_Info = require('../models/overall_group');

router.get('/date/:date/range/:range', function(req,res){
    Group.getTopGroups(req.params.date, req.params.range, 20, function(err, groups){
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
        console.log("group leaders");
        res.json(leaders);
    });
});

router.get('/leaders/date/:date/range/:range/groupID/:group_id/all', function(req,res){
    date = req.params.date;
    range = parseInt(req.params.range);
    groupID = parseInt(req.params.group_id);
    Group.getAllGroupLeader(date, range, groupID, function(err, leaders){
        if (err){
            throw err;
        }
        console.log("all group leaders");
        res.json(leaders);
    });
});


router.get('/topArticles/date/:date/range/:range/groupID/:group_id/limit/:limit', function(req,res){
    date = req.params.date;
    range = parseInt(req.params.range);
    groupID = parseInt(req.params.group_id);
    limit = parseInt(req.params.limit);
    Group_Info.getGroupTopArticle(date,range,groupID, limit, function(err, results){
        if(err){
            throw err;
        }
        console.log("Top Articles for Overall Group");
        // console.log(results)
        res.json(results);
    });
});

router.get('/available_time', function(req, res){
    Group.getAvailableTimeInterval(function(err, results){
        if(err){
            throw err;
        }
        res.json(results);
    });
});

module.exports = router;
