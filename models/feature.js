const mongoose = require('mongoose');

//Feature Schema
const featureSchema = mongoose.Schema({
    group:{ type: Number, required:true },
    result:{ type: Array, requred:true }
});

const Feature = module.exports = mongoose.model('Feature', featureSchema, 'tempFeature');

//===========================Basic Controller===============================
//Get Users
module.exports.getGroupFeature = function(groupId, callback){
    Feature.findOne({group:groupId}, "result -_id", callback);
};
