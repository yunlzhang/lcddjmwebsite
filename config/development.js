module.exports = {
  port: 8080,
  session: {
    secret: 'user',
    key: 'user',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://127.0.0.1:27017/website'
}