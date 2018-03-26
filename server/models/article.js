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
			Post.findOne({_id: id}),
			Post.find({'_id': { '$lt': id } }).sort({_id: -1}).limit(1).lean()
		])
	},
	getPosts(opts) {
		opts = opts || {};
		var page = Number(opts.page) || 1,
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
	getLength(){
		return Post
			.count();
	},
	incPv(postId) {
		return Post
			.update({
				_id: postId
			}, {
				$inc: {
					pv: 1
				}
			});
	},
};
