var Post = require('../lib/mongo').Post;

module.exports = {
	create: function(article) {
		return Post.create(article).exec();
	},

	// 通过文章的id获取相关文章
	getPostById: function(id) {
		return Post
			.findOne({
				_id: id
			})
			.addCreatedAt()
			.exec();
	},
	getPosts: function(opts) {
		opts = opts || {};
		var page = Number(opts.page) || 1,
			num = Number(opts.num) || 10;

		delete opts.page;
		delete opts.num;
		return Post
			.find(opts)
			.skip((page-1)*10)
			.limit(num)
			.addCreatedAt()
			.sort({_id:-1})
			.exec();
	},
	getLength:function(){
		return Post
			.find({})
			.exec();
	},
	incPv: function(postId) {
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
