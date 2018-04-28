const Comment = require('../lib/mongoose').Comment;
const Promise = require("bluebird");

module.exports = {
	// 注册一个用户
	create(data) {
		let newComment = new Comment(data);
		return newComment.save();
	},
	getPostById(id) {
		return Comment.find({
			'article_id':id,
		})
		.populate('user')
		.sort({_id: 1}).lean();
	}
};
