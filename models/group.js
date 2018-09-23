const mongoose = require('mongoose');

//User Schema
const groupSchema = mongoose.Schema({
    date:{ type: String, required:true },
    day_range: { type: Number, required:true },
    overall_groupID_list: { type: Array },
    overall_groupUser_list: { type: Array },
    overall_groupArticle_list: { type: Array },
    overall_group_list: { type: Array, required: true }
});

const Group = module.exports = mongoose.model('Group', groupSchema, 'Group');

//===========================Basic Controller===============================
module.exports.getTopGroups = function(limit, callback){
    Group.aggregate([
    {
        "$group":{
            "_id":{"group":"$group"},
	        "count":{"$sum":1},
            "userId":{"$push":"$id"}
        }
    },
	{
        "$match":{
            "count":{"$gt":1}
        }
    },
	{
        "$sort":{"count":-1}
    },{
        "$limit": parseInt(limit)
    }], callback)
};

module.exports.getUserGroup = function(id, callback){
    Group.find({id:id}, {group:1, _id:0}, callback)
}