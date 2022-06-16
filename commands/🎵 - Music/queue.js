const { MessageEmbed, MessageButton } = require('discord.js');

const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

module.exports = {
    name: 'queue',
    description: 'Menampilkan Daftar Putar',
    category: '🎵 - Music',
    aliases: ['q'],
    usage: 'queue',
    cooldown: 5,
    run: async (client, message, args, _fromButton = false) => {
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
        if(!queue) return message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#000008')
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

        const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')

        const tracks = queue.songs
        .map((song, i) => `**${i + 1}** - [${song.name}](${song.url}) | ${song.formattedDuration}
        Ditambahkan : ${song.user}`)

        const songs = queue.songs.length;
        const nextSongs = songs > 10 ? `**${songs - 10}** lagu yang lain...` : `Di daftar putar **${songs}** lagu...`;

        message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('#000008')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`${tracks.slice(0, 10).join('\n')}\n\n${nextSongs}`)
			.setFooter(`${footer}`)
            .addField(`Total Durasi:`, `${queue.formattedDuration}`, true)
            .addField(`Jumlah Lagu:`, `${songs}`, true)
			.addField(`Sedang dimainkan:`, `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Ditambahkan: ${queue.songs[0].user}`, true)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
    }
}
