const  config = process.env.NODE_ENV === 'development' ? require('../../config/development') : require('../../config/production')
// const config = require('../../config/production');

const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

//model
let User,Post,Comment;


mongoose.connect(config.mongodb,{ socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } });

/**
 * 
 * 用户
 * 
 */
const UserSchema = mongoose.Schema({
    name: String,
	password: String,
	intro: String
});
UserSchema.set('autoIndex', false);
UserSchema.index({name: 1}, {unique: true});
User = mongoose.model('User', UserSchema);

/**
 * 
 *  文章
 *  
 */
const PostSchema = mongoose.Schema({
    author:mongoose.Schema.Types.ObjectId,
    title:String,
    cover:String,
    content:String,
    tags:Array,
    pv:Number
})
PostSchema.set('autoIndex', false);
PostSchema.index({author: 1,_id: -1});
Post = mongoose.model('Post',PostSchema)

/**
 * 
 * comment
 * 
 */
const CommentSchema = mongoose.Schema({
    author:mongoose.Schema.Types.ObjectId,
	content:String,
	postId:mongoose.Schema.Types.ObjectId
})
CommentSchema.set('autoIndex', false);
CommentSchema.index({postId: 1,author:1,_id: 1})
Comment = mongoose.model('Comment', CommentSchema);


module.exports = {
    User,
    Post,
    Comment
}