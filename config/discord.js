if(process.env.NODE_ENV === 'production'){
  module.exports = {discordToken: process.env.EMOTION_DISCORD_TOKEN}
} else {
  module.exports = {discordToken: process.env.EMOTION_TEST_DISCORD_TOKEN}
}
