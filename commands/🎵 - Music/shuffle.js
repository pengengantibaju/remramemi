const { MessageEmbed } = require('discord.js');

const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

module.exports = {
    name: "shuffle",
    aliases: ["shuffle"],
    category: "🎵 - Music",
    description: "Mengacak lagu di daftar putar.",
    usage: "",
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('RED')
			.setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`🚫 | Anda harus berada di voice channel untuk menggunakan fitur ini.`)
			.setFooter(`${footer}`)
        ]})
		.then(msg => {
    setTimeout(() => msg.delete(), 8000)
  });
        if(!queue) return message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Tidak ada lagu yang diputar!')
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })
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

        queue.shuffle();
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#000008')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Berhasil!')
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })
    }
}
