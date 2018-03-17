const  config = process.env.NODE_ENV === 'development' ? require('../../config/development') : require('../../config/production')
const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

mongoose.connect(config.mongodb);

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
exports.User = mongoose.model('User', UserSchema);
// exports.User.ensureIndex({name: 1}, {unique: true}).exec();


//建立索引

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
exports.Post = mongoose.model('Post',PostSchema)
// exports.Post.ensureIndex({
// 	author: 1,
// 	_id: -1
// }).exec();

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
exports.Comment = mongoose.model('Comment', CommentSchema);

// exports.Comment.ensureIndex({
// 	postId: 1,
// 	_id: 1
// }).exec(); // 通过文章 id 获取该文章下所有留言，按留言创建时间升序

// exports.Comment.ensureIndex({
// 	author: 1,
// 	_id: 1
// }).exec(); // 通过用户 id 和留言 id 删除一个留言
