const { MessageEmbed } = require('discord.js');

const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

module.exports = {
    name: "seek",
    aliases: ["seek"],
    category: "🎵 - Music",
    description: "Lompat ke waktu sepesifik.",
    usage: "<waktu>",
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
    setTimeout(() => msg.delete(), 8000)
  });
        if(!queue) return message.reply({embeds: [
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
                return message.reply({embeds: [
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
        
        if(!args[0]) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Anda harus memilih garis waktu untuk mundur!')
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })

        const time = Number(args.join(' '));
        console.log(time)
        console.log(queue.songs[0].formattedDuration)
        console.log(queue.songs[0].duration)
        if(time > queue.songs[0].formattedDuration) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Waktu mundur tidak boleh lebih lama dari waktu lagu!')
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })

        queue.seek(time);
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`Seek **${time}ms / ${queue.songs[0].duration}ms**`)
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })
    }
}