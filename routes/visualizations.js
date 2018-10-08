//Router:/api/visual/

var express = require('express');
var router = express.Router();
Visualization = require('../models/visualization');

router.get('/date/:date/range/:range/group/:groupID', function(req,res){
    Visualization.getVisualization(req.params.date, req.params.range, req.params.groupID ,function(err, visualData){
        if(err){
            throw err;
        }
        console.log("Request visual data: "+req.params.date+"_"+req.params.range+"_"+req.params.groupID);
        res.json(visualData)
    });
});

router.get('/date/:date/range/:range/group/:groupID/gate/:gate', function(req,res){
    var date = req.params.date;
    var range = parseInt(req.params.range);
    var groupID = parseInt(req.params.groupID);
    var gate = parseInt(req.params.gate)

    var nodes = [];
    Visualization.getVisualizationNodes(date, range, groupID ,function(err, visualData){
        if(err){
            throw err;
        }
        console.log("Request visual data: "+date+"_"+range+"_"+groupID);
        // return(visualData);
        nodes = visualData;
        console.log(nodes)
    });

    var links = [];
    Visualization.getVisualizationLinks(date, range, groupID, gate, function(err, result){
        if(err){
            throw err;
        }
        links = result;
    //   return(result);
    });
    var resData = {
        "nodes":nodes,
        "links":links
    };
    res.json(resData);

});


module.exports = router;