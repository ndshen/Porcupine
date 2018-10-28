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
module.exports.getTopGroups = function(date, day_range, min_size, callback){
    Group.aggregate([
        {
            "$match":{
                "date":date,
                "day_range":parseInt(day_range),
                "official":1
            }
        },
        {
            "$project":{
                "_id": 0,
                "overall_group_list":1
            }
        },
        {
            "$unwind": "$overall_group_list"
        },
        {
            "$project":{
                "group_id":"$overall_group_list.overall_group_id",
                "group_count":{"$size":"$overall_group_list.overall_group_users"}
            }
        },
        {
            "$match":{
                "group_count":{"$gt":min_size}
            }
        }
    ],callback)
};

module.exports.getUserGroup = function(id, callback){
    Group.find({id:id}, {group:1, _id:0}, callback);
};

module.exports.getGroupLeader = function(date,day_range,group_id, internal_group_id, callback){
    Group.aggregate([
        {
            "$match":{
                "date":date,
                "day_range":day_range,
                "official":1
            }
        },
        {
            "$project":{
                "_id":0,
                "group_list":"$overall_group_list"
            }
        },
        {
            "$unwind":"$group_list"
        },
        {
            "$match":{
                "group_list.overall_group_id":group_id
            }
        },
        {
            "$project":{
                "internal_groups":"$group_list.internal_group_list"
            }
        },
        {
            "$unwind":"$internal_groups"
        },
        {
            "$match":{
                "internal_groups.internal_group_id":internal_group_id
            }
        },
        {
            "$project":{
                "group_leaders_id":"$internal_groups.internal_group_leaders"
            }
        },
        {
            "$unwind":"$group_leaders_id"
        },
        {
            "$lookup":{
                "from":"User",
                "localField":"group_leaders_id",
                "foreignField":"id",
                "as":"group_leaders_detail"
            }
        },
        {
            "$unwind":"$group_leaders_detail"
        },
        {
            "$project":{
                "group_leader_id":"$group_leaders_id",
                "group_leader_name":"$group_leaders_detail.Name"
            }
        },
        {
            "$limit":3
        }
    ], callback);
};

module.exports.getAllGroupLeader = function(date, day_range, group_id, callback){
    Group.aggregate([
        {
            "$match":{
                "date":date,
                "day_range":day_range,
                "official":1
            }
        },
        {
            "$project":{
                "_id":0,
                "group_list":"$overall_group_list"
            }
        },
        {
            "$unwind":"$group_list"
        },
        {
            "$match":{
                "group_list.overall_group_id":group_id
            }
        },
        {
            "$project":{
                "internal_groups":"$group_list.internal_group_list"
            }
        },
        {
            "$unwind":"$internal_groups"
        },
        {
            "$project":{
                "all_group_leaders":"$internal_groups.internal_group_leaders"
            }
        }
    ], callback)
};

module.exports.get_inter_articles = async function(date, day_range, group_id, internal_group_id){
    let result = await Group.aggregate([
        {
            "$match":{
                "date":date,
                "day_range":day_range,
                "official":1
            }
        },
        {
            "$project":{
                "_id":0,
                "group_list":"$overall_group_list"
            }
        },
        {
            "$unwind":"$group_list"
        },
        {
            "$match":{
                "group_list.overall_group_id":group_id
            }
        },
        {
            "$project":{
                "internal_groups":"$group_list.internal_group_list"
            }
        },
        {
            "$unwind":"$internal_groups"
        },
        {
            "$match":{
                "internal_groups.internal_group_id":internal_group_id
            }
        },
        {
            "$project":{
                "push":"$internal_groups.internal_top_articles.top_push",
                "boo":"$internal_groups.internal_top_articles.top_boo"
            }
        }
    ]).exec();
    return(result);
}

module.exports.getAvailableTimeInterval = function(callback){
    Group.find({"overall_group_list":{"$elemMatch":{"internal_group_list":{"$exists":true}}}, "official":1},{date:1, day_range:1, _id:0}, callback);
};
