const mongoose = require('mongoose');

//Visualization Schema
const visualSchema = mongoose.Schema({
    date: { type: String, required: true },
    day_range: { type: Number, required: true},
    nodes: { type: Array, required: true},
    links: { type: Array, required: true}
})

const Visualization = module.exports = mongoose.model('Visualization', visualSchema, "Visualization");

//===========================Basic Controller===============================
module.exports.getVisualization = function(date, day_range, callback){
    Visualization.find({date:date, day_range: day_range}, {_id:0, nodes:1, links:1 }, callback)
}