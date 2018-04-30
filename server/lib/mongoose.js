const  config = process.env.NODE_ENV === 'development' ? require('../../config/development') : require('../../config/production')
// const config = require('../../config/production');

const mongoose = require('mongoose');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const Schema = mongoose.Schema;
//model
let User,Post,Comment;


mongoose.connect(config.mongodb,{ keepAlive: 1, connectTimeoutMS: 30000 });

/**
 * 
 * 用户
 * 
 */
const UserSchema = Schema({
    name: String,
	password: String,
    intro: String,
    avatar:{
        type:String,
        default:'https://image.lcddjm.com/avatar/7e89cb90-4c29-11e8-9168-4de305b3c4a5.png'
    },
    created_at :{ 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});
UserSchema.set('autoIndex', false);
UserSchema.index({name: 1}, {unique: true});
User = mongoose.model('User', UserSchema);

/**
 * 
 *  文章
 *  
 */
const PostSchema = Schema({
    author:Schema.Types.ObjectId,
    title:String,
    cover:String,
    content:String,
    tags:Array,
    comments:[{
        type:Schema.Types.Mixed,
        ref:'Comment',
    }],
    comments_count:{
        type:Number,
        default:0
    },
    pv:{
        type:Number,
        default:0
    },
    created_at :{ 
        type: Date, 
        required: true, 
        default: Date.now 
    }
})
PostSchema.set('autoIndex', false);
PostSchema.index({author: 1,_id: -1});
Post = mongoose.model('Post',PostSchema)

/**
 * 
 * comment
 * 
 */
const CommentSchema = Schema({
    article_id:Schema.Types.ObjectId,    
	content:String,
    parent_id:{
        type:String,
        default:''
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }, 
    sub_comments:[{
        type:String,
        ref:'Comment'
    }],
    sub_comments_count:{
        type:Number,
        default:0
    },
    to_user:{
        type:String,
        ref:'User',
        default:''        
    },
    created_at :{ 
        type: Date, 
        required: true, 
        default: Date.now 
    }
})
CommentSchema.index({article_id: 1,user_id:1,_id: 1})
Comment = mongoose.model('Comment', CommentSchema);


module.exports = {
    User,
    Post,
    Comment
}