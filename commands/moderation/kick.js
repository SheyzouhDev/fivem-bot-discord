const { Permissions, MessageEmbed } = require('discord.js');
const perms = require('../../permissions.json');

exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${perms.permissions.KICK_MEMBERS}`)
        ]
    });

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Vous devez mentionner un utilisateur**`)
        ]
    });

    if (user.id === message.author.id) return message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Vous ne pouvez pas vous kick**`)
        ]
    });

    if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Vous ne pouvez pas bannir cet utilisateur, il a un rôle supérieur ou égal au vôtre**`)
        ]
    });

    if (user.id == client.user.id) return message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Je n'ai pas la permission d'utiliser cette commande**`)
        ]
    })

    let reason = args.join(' ').slice(22);
    if (!reason) return message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Vous devez mentionner une raison**`)
        ]
    });

    user.kick({ reason: `${reason}` });

    message.channel.send({
        embeds: [new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${user} **a été kick** ✅`)
        ]
    });
};

exports.help = {
    name: 'kick',
    description: '',
    usage: '',
    example: 'kick @sнεүzααα#0001 spam'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};