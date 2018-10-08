const mongoose = require('mongoose');

//User Schema
const userSchema = mongoose.Schema({
    Name:{ type: String, required:true },
    id:{ type: Number, requred:true },
    Nickname:{ type:Date },
    CorrelatedUser:{ type:Array },
    Article:{ type:Array },
    Message:{ type:Array }
});

const User = module.exports = mongoose.model('User', userSchema, 'User');

//===========================Basic Controller===============================
//Get Users
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
};

//Get one user
module.exports.getUserById = function(id ,callback){
    User.find({id:id}, callback);
};

module.exports.getUserByName = function(name, callback){
    User.find({Name:name}, "Name CorrelatedUser -_id",callback);
};

module.exports.getUserIP = function(id, callback){
    User.aggregate([
        {
            "$match":{
                "id":id
            }
        },
        {
            "$project":{
                "_id":0,
                "Article":"$Article"
            }
        },
        {
            "$unwind":"$Article"
        },
        {
            "$sort":{"Article.art_time":-1}
        },
        {
            "$limit":1
        },
        {
            "$lookup":{
                "from":"Article",
                "localField":"Article.art_id",
                "foreignField":"id",
                "as":"ArticleData"    
            }
        },
        {
            "$unwind":"$ArticleData"
        },
        {
            "$project":{
                "ip":"$ArticleData.IPaddress"
            }
        }
    ], callback)
};