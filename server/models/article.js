var Post = require('../lib/mongo').Post;

module.exports = {
  create: function create(article) {
    return Post.create(article).exec();
  },

  // 通过文章的id获取相关文章
  getPostsById: function getPostById(id) {
    return Post
      .findOne({ _id: id })
      .addCreatedAt()
      .exec();
  },
  incPv: function incPv(postId) {
    return Post
      .update({ _id: postId }, { $inc: { pv: 1 } })
      .exec();
  },
};
