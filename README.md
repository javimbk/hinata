# hinata 🏐🤖

Hinata is a bot designed to keep a volleyball team updated about their league with no effort at all.

### Why?

Madrid's Volleyball Federation page is a bit clunky and getting to the desired information can be a pain sometimes.
Also they are not that consistent when it comes to updating the past week results and current standings, so people tend to go to the website often and check if something has been updated.

Well, not anymore. Hinata will do it for you and will let you know as soon as any change has been made on a league group.

I built this for my gf's volleyball team which I support (of course), but I've also made it available to work with any other Madrid Volleyball Federation division and group.

Also I'm trying to brush up my Javascript skills, and this is a nice way to do so.

### How?

Hinata checks FMVoley's website once in a while (30 minutes as of right now) to see if something has changed in the desired group standings, comparing against what it has stored previously.
If something has changed, it will update the stored data and notify via Telegram to anyone subscribed to it.
Users subscribed to the Telegram bot will receive a nice formatted text, targetted for IM apps (since Whatsapp doesn't allow for bots), that he/she can easily share with anyone.

### I want to use this for my group, what do I do?

The app is [published on dockerhub](https://hub.docker.com/r/javimbk/hinata-telegram-bot), so it is really easy to get your own Hinata running.
You wil need to set some environment variables in order for it to work. This way you can customize your own bot.

Message me if you want some help.

| Environment Variable | Value                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| TELEGRAM_BOT_TOKEN   | Get your token from the Botfather!                                                                                                              |
| FMVOLEY_GROUP_ID     | FMVoley Id for the group you want to be updated on.<br>You can get it through their website if you dig a bit!<br>Let me know if I can help you. |
| MONGODB_URL          | MongoDB Database URL                                                                                                                            |
| MONGODB_DBNAME       | MongoDB Database Name                                                                                                                           |

### What's the motive behind the repo's name?

[🏐This kid's fault](https://haikyuu.fandom.com/wiki/Sh%C5%8Dy%C5%8D_Hinata)

