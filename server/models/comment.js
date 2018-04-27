const Post = require('../lib/mongoose').Comment;
const Promise = require("bluebird");

module.exports = {
	// 注册一个用户
	create(data) {
		let newComment = new comment(data);
		return newComment.save();
	},
	getPostById(id) {
		return Post.find({
			'article_id':id,
		}).sort({_id: 1}).lean();
	}
};
