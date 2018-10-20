const mongoose = require('mongoose');

//Visualization Schema
const visualSchema = mongoose.Schema({
    date: { type: String, required: true },
    day_range: { type: Number, required: true},
    group_id: { type: Number, required: true},
    nodes: { type: Array, required: true},
    links: { type: Array, required: true}
})

const Visualization = module.exports = mongoose.model('Visualization', visualSchema, "Visualization_inner");

//===========================Basic Controller===============================
module.exports.getVisualization = function(date, day_range, groupID,callback){
    Visualization.find({date:date, day_range: day_range, group_id:groupID}, {_id:0, nodes:1, links:1 }, callback)
}

module.exports.getVisualizationNodes = async function(date, day_range, groupID){
    let result = Visualization.find({date:date, day_range: day_range, group_id:groupID}, {_id:0, nodes:1}).exec();
    return(result);
}

module.exports.getVisualizationLinks = async function(date,day_range, groupID, gate){
    let result = await Visualization.aggregate([
        {
            "$match":{
                "date":date,
                "day_range":day_range,
                "group_id":groupID
            }
        },
        {
            "$project":{
                "group_id":"$group_id",
                "links":"$links",
                "_id":0
            }
        },
        {
            "$unwind":"$links"
        },
        {
            "$match":{
                "links.weight":{"$gte":gate}
            }
        },
        {
            "$group":{
                "_id":"group_id",
                "links":{"$push":"$links"},
            }
        },
        {
            "$project":{
                "_id":0,
                "links":"$links"
            }
        }
    ]).exec();
    return(result);
}
