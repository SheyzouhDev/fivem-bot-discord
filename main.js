const { Intents, Guild } = require ('discord.js');
const FiveDiscord = require ('./handler/Client');
const client = new FiveDiscord({
    partials : ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});

require('./handler/Module')(client);
require('./handler/Events')(client);
require('dotenv').config();
client.on('warn', console.warn);
client.on('error', console.error);
client.login(process.env.TOKEN).catch(console.error);

const fivereborn = require ('fivereborn-query');
const FiveD = require ('./FiveD.json');

function activity() {
    setTimeout(() => {
        fivereborn.query(FiveD.serverInfo[0], FiveD.serverInfo[1], (err, data) => {
            if (err) {
                console.log(err)
            } else {
                client.user.setActivity('Joueur connecté : ' + data.clients + '/' + data.maxclients, { type: FiveD.activityType})
                //si vous souhaitez ajouter d'autre information rendez-vous dans le dossier pour voir ce que vous pouvez ajouter : node_modules > fivereborn-query > index.js 
            }
        });

        activity();
    }, 10000);
}
activity();