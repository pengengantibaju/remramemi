const { MessageEmbed } = require('discord.js');

const nama = 'Kiryuu Music'
const footer = 'Coded by Aesir#4444'
const icon = 'https://cdn.discordapp.com/attachments/973374918894968902/984581064863395900/Logo_New_512.png'

module.exports = {
    name: "pause",
    aliases: ["pause"],
    category: "🎵 - Music",
    description: "Jeda lagu.",
    usage: "",
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
			.setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`🚫 | Anda harus berada di voice channel untuk menggunakan fitur ini.`)
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 7000)
  });
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Tidak ada lagu yang diputar!')
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 7000)
  })
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
					.setAuthor({name: `${nama}`, iconURL: `${icon}`})
                    .setDescription(`🚫 | Anda harus berada di voice channel yang sama dengan bot!`)
					.setFooter(`${footer}`)
                ]}).then(msg => {
    setTimeout(() => msg.delete(), 7000)
  });
            }
        }
        queue.pause();
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Lagu dijeda!')
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 60000)
  })
    }
}
