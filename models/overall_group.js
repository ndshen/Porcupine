const mongoose = require('mongoose');

//overall_group Schema
const overall_group_schema = mongoose.Schema({
    date: { type: String, required: true },
    day_range: { type: Number, required: true},
    group_id: { type: Number, required: true},
    top30: { type: Array, required: true}
});

const Group_Info = module.exports = mongoose.model('Group_Info', overall_group_schema, "finalGroup");

//===========================Basic Controller===============================
module.exports.getGroupTopArticle = function(date, day_range, groupID, limit, callback){

    Group_Info.aggregate([
        {
            "$match":{
                "date":date,
                "day_range":day_range,
                "group_id":groupID,
                "official":1
            }
        },
        {
            "$project":{
                "group":"$group_id",
                "top30":"$top30"
            }
        },
        {
            "$unwind":"$top30"
        },
        {
            "$lookup":{
                "from":"Article",
                "localField":"top30",
                "foreignField":"id",
                "as":"ArticleName"      
            }
        },
        {
            "$unwind":"$ArticleName"
        },
        {
            "$project":{
                "_id":0,
                "articleId":"$top30",
                "name":"$ArticleName.ArticleName",
                "url":"$ArticleName.URL"
            }
        },
        {
            "$limit":limit
        }
    ], callback);
}