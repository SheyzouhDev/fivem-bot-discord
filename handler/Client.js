const { Client, Collection } = require ('discord.js');

module.exports = class FiveDiscord extends Client {

    constructor(option){
        super(option)

        this.commands = new Collection();
        this.cooldown = new Collection();
        this.aliases = new Collection();
        this.settings = require ('../settings.json');
        this.package = require ('../package.json');
        this.recent = new Set();
    };
};