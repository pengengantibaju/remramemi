const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverlist',
    aliases: ['sl'],
    category: '🦉 - Owner',
    usage: 'k2!serverlist',
    description: 'Tampilkan daftar server bot',

    run: async(client, message, args) => {
        if(message.author.id != '570589477920309259') {
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | Hanya Nanda#1234 yang bisa menggunakan command ini!')
            ]})
        } else {
            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(50)

            const description = guilds.map((guild, index) => {
                return `${index + 1}. ${guild.name} - ${guild.id} - ${guild.memberCount} member`
            }).join('\n')

            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setTitle(`Daftar server bot (${client.guilds.cache.size} server)`)
            .setDescription(description)

            message.channel.send({ embeds: [embed]})
        }
    }
}