//Router: /api/features/

var express = require('express');
var router = express.Router();
Feature = require('../models/feature');

router.get('/date/:date/range/:range/group/:groupId', function(req,res){
    console.log(req.originalUrl+" has been called.");
    range = parseInt(req.params.range);
    groupId = parseInt(req.params.groupId);
    Feature.getGroupFeature(req.params.date,range,groupId, function(err, featueList){
        if(err){
            throw err;
        }
        if(featueList != null){
            res.json(featueList);
        }
        else{
            res.json([]);
        }
    });
});

module.exports = router;
