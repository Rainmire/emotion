if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: process.env.EMOTION_MLAB_URI}
} else {
  // module.exports = {mongoURI: 'mongodb://localhost/emotion'}
  module.exports = {mongoURI: 'mongodb://localhost/test'}
}
