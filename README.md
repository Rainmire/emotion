# emotion - a Discord bot for custom emotes

## Simplicity is key
emotion is a lightweight Discord bot written in Node JS and supported by a MongoDB database.
```
Commands:
  !<emote>        Send an emote
  ?add <emote>    Add a new emote. Use as a comment when adding an image
  ?delete <emote> Delete an emote
  ?emotes         List all emotes
  ?gettoken       Generate a token used to import emotes from this server
  ?import <token> Import emotes from another server. Use ?gettoken in the source server to generate a token
  ?help           Print this index
```

To add emotion to your server, click here: https://discordapp.com/api/oauth2/authorize?client_id=417809459864272906&permissions=0&scope=bot

Want some sample emotes to help you get started? Use the command `?import default` to add some of my emotes!

#### Powered by Heroku and mLab