if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://rainmire:Qiuminmy18@ds249428.mlab.com:49428/emotion-db'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/emote-bot'}
}
