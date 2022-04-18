const { Permissions, MessageEmbed } = require ('discord.js');
const perms = require('../../permissions.json');

exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({ embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${perms.permissions.ADMINISTRATOR}`)
    ]});

    let say = args.join(' ');
    message.channel.send(say);
    message.delete();

};

exports.help = {
    name: 'say',
    description: '',
    usage: '',
    example: 'say hello world!'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};