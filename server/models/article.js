var Post = require('../lib/mongo').Post;

var Promise = require("bluebird");
module.exports = {
	create(article) {
		return Post.create(article).exec();
	},

	// 通过文章的id获取相关文章
	getPostById(id) {
		return Promise.all([
			Post.find({ '_id': { '$gt': id } }).sort({_id: 1}).limit(1).addCreatedAt().exec(),					
			Post.findOne({_id: id}).addCreatedAt().exec(),
			Post.find({'_id': { '$lt': id } }).sort({_id: -1}).limit(1).addCreatedAt().exec()
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
			.addCreatedAt()
			.sort({_id:-1})
			.exec();
	},
	updateArticle(id,options){
		return Post
			.findOneAndUpdate({_id:id},{
				$set:options
			})
			.exec();
	},
	getLength(){
		return Post
			.find({})
			.exec();
	},
	incPv(postId) {
		return Post
			.update({
				_id: postId
			}, {
				$inc: {
					pv: 1
				}
			})
			.exec();
	},
};
