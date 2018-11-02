const mongoose = require('mongoose');

//Feature Schema
const featureSchema = mongoose.Schema({
    date:{type:String, required:true},
    day_range:{type:Number, required:true},
    group:{ type: Number, required:true },
    top_keywords:{ type: Array, required:true }
});

const Feature = module.exports = mongoose.model('Feature', featureSchema, 'Feature');

//===========================Basic Controller===============================
//Get Users
module.exports.getGroupFeature = function(date, day_range, groupId, callback){
    Feature.findOne({date:date, day_range:day_range, group:groupId, official:1}, "top_keywords -_id", callback);
};
