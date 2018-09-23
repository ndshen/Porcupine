//Router: /api/feature/

var express = require('express');
var router = express.Router();
Feature = require('../models/feature');

router.get('/group/:groupId', function(req,res){
    Feature.getGroupFeature(req.params.groupId, function(err, featueList){
        if(err){
            throw err;
        }
        if(featueList != null){
            res.json(featueList.result)
        }
        else{
            res.json([])
        }
    });
});

module.exports = router;
