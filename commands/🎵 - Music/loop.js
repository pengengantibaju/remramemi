const { MessageEmbed } = require('discord.js');

const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    category: "🎵 - Music",
    description: "Loop Musik.",
    usage: "loop",

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
    setTimeout(() => msg.delete(), 10000)
  });
        if(!queue) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Tidak ada lagu yang diputar!')
			.setFooter(`${footer}`)
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
					.setAuthor({name: `${nama}`, iconURL: `${icon}`})
                    .setDescription(`🚫 | Anda harus berada di voice channel yang sama dengan bot!`)
					.setFooter(`${footer}`)
                ]}.then(msg => {
    setTimeout(() => msg.delete(), 10000)
  }));
            }
        }

        let mode = null;
        if(!args[0]) {
            mode = 0;
            message.reply({embeds: [
                new MessageEmbed()
                .setColor('EF4F4F') 
                .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Anda harus memilih 1 opsi!')
			.setFooter(`${footer}`)
                .addField('Off', 'Menonaktifkan Loop.', true)
                .addField('Song', 'Loop lagu saat ini.', true)
                .addField('Queue', 'Loop semua lagu dalam daftar putar.', true)
            ]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  })
        }

        switch (args[0]) {
        case 'off':
            mode = 0
            break
        case 'song':
            mode = 1
            break
        case 'queue':
            mode = 2
            break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Queue' : 'Song') : 'Off'
        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#000008')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`Loop **${mode}**!`)
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 5000)
  })
    }
}
