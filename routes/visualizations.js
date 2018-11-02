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

router.get('/date/:date/range/:range/group/:groupID/gate/:gate', async function(req,res){
    var date = req.params.date;
    var range = parseInt(req.params.range);
    var groupID = parseInt(req.params.groupID);
    var gate = parseInt(req.params.gate)
    let nodes = await Visualization.find({date:date, day_range: range, group_id:groupID, official:1}, {_id:0, nodes:1}).exec();
    let links = await Visualization.getVisualizationLinks(date, range, groupID, gate);
    // try{
    //     result = {
    //         "nodes":nodes[0].nodes,
    //         "links":links[0].links
    //     };
    // }
    // catch(error){
    //     result = {
    //         "success":false
    //     }
    // }
    result = {
        "nodes":nodes[0].nodes,
        "links":links[0].links
    };
    res.json(result);

});


module.exports = router;