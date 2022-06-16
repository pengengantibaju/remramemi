// const player = require('../../client/player.js');
const { MessageEmbed } = require('discord.js');

const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

module.exports = {
    name: 'play',
    description: 'Putar lagu YouTube, SoundCloud, Spotify, Mixer, Twitch, Bandcamp, atau Link.',
    aliases: ['p'],
    usage: '<judul lagu>',
    category: '🎵 - Music',
    cooldown: 0,
    guildOnly: true,
    args: true,
    run: async (client, message, args) => {
        const string = args.join(' ')
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('RED')
			.setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`🚫 | Anda harus berada di voice channel untuk menggunakan fitur ini.`)
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  });

        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.channel.send({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
					.setAuthor({name: `${nama}`, iconURL: `${icon}`})
                    .setDescription(`🚫 | Anda harus berada di voice channel yang sama dengan bot!`)
					.setFooter(`${footer}`)
                ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  });
            }
        }
/*
        const msg = await message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#000008')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`🎵 | Mencari...`)
			.setFooter(`Coded by Aesir#4444`)
			.setFooter(`${footer}`)
        ]}) .then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })
*/
        client.distube.play(voiceChannel, string, {
            member: message.member,
            textChannel: message.channel,
            message
        })
    }
}
