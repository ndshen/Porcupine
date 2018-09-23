//Router:/api/visual/

var express = require('express');
var router = express.Router();
Visualization = require('../models/visualization');

router.get('/date/:date/range/:range', function(req,res){
    Visualization.getVisualization(req.params.date, req.params.range, function(err, visualData){
        if(err){
            throw err;
        }
        console.log("Request visual data: "+req.params.date+"_"+req.params.range);
        res.json(visualData)
    });
});

module.exports = router;