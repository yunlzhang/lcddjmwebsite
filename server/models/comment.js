const Comment = require('../lib/mongoose').Comment;
const Promise = require("bluebird");

module.exports = {
	create(data) {
		let newComment = new Comment(data);
		return newComment.save().then(result=>{
			if(!result.parent_id){
				return  Comment.populate(result,[
					{
						path:'user',
						select:'avatar name _id'
					}
				])
			}else{
				return  Comment.populate(result,[
					{
						path:'user',
						select:'avatar name _id'
					},
					{
						path:'to_user',
						select:'avatar name _id'
					}
				])
			}
			
		});
	},
	updateComment(id,sub_id){
		return Comment
		.findOneAndUpdate(
			{_id:id},
			{
				$push:{
					'sub_comments':sub_id
				},
				$inc:{
					'sub_comments_count':1
				}
			},
			{new: true}
		);
	},
	getComment(opts){
		return Comment.find({
			article_id:opts.article_id,
			parent_id:''
		})
		.sort({_id:-1})
		.skip(10*(opts.page - 1))
		.limit(10)
		.populate([
			{
				path:'sub_comments',
				options:{
					sort:{_id:-1},
					limit:5
				},
				populate:[
					{
						path:'user',
						select:'avatar name _id'
					},
					{
						path:'to_user',
						select:'avatar name _id'
					}
				]
			},
			{
				path:'user',
				select:'avatar name _id'
			}
		])
		.lean();
	},
	getSubComment(opts){
		return Comment.find({
			article_id:opts.article_id,
			parent_id:opts.parent_id,
			_id:{
				$gt:opts.last_id
			}
		})
		.sort({_id:1})		
		.limit(opts.count)
		.populate([
			{
				path:'user',
				select:'avatar name _id'
			},
			{
				path:'to_user',
				select:'avatar name _id'
			}
		])
		.lean();
	}
};
