const Post = require('../lib/mongoose').Post;
const Promise = require("bluebird");
module.exports = {
	create(article) {
		let newArticle = new Post(article);
		return newArticle.save();
	},
	// 通过文章的id获取相关文章
	getPostById(id) {
		return Promise.all([
			Post.find({ '_id': { '$gt': id } }).sort({_id: 1}).limit(1).lean(),					
			Post.findOne({_id: id})
			.populate({
				path:'comments',
				options:{limit:5},
				populate:[
					{
						path:'sub_comments',
						options:{limit:3},
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
				]
			})
			.lean(),
			Post.find({'_id': { '$lt': id } }).sort({_id: -1}).limit(1).lean()
		])
	},
	getPosts(opts) {
		opts = opts || {};
		let page = Number(opts.page) || 1,
			num = Number(opts.num) || 5;

		delete opts.page;
		delete opts.num;
		return Post
			.find(opts)
			.skip((page-1)*5)
			.limit(num)
			.sort({_id:-1})
			.lean();
	},
	updateArticle(id,options){
		return Post
			.findOneAndUpdate({_id:id},{
				$set:options
			});
	},
	updateComment(id,comment_id){//返回更新前数据 要想返回更新后数据 
		return Post
			.findOneAndUpdate(
				{_id:id},
				{
					$push:{
						'comments':comment_id
					}
				},
				{new: true}
			);
	},
	getLength(){
		return Post
			.count();
	},
	incPv(id) {
		return Post
			.update({
				_id: id
			}, {
				$inc: {
					pv: 1
				}
			});
	},
};
