const { MessageEmbed } = require('discord.js');
const Format = Intl.NumberFormat();

const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

module.exports = {
    name: "nowplaying",
    aliases: ["np", "now"],
    category: "🎵 - Music",
    description: "Menampilkan lagu saat ini.",
    usage: "nowplaying",
    run: async (client, message, args) => {
        const queue = await client.distube.getQueue(message.guild.id);
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('RED')
			.setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription(`🚫 | Anda harus berada di voice channel untuk menggunakan fitur ini.`)
			.setFooter(`${footer}`)
        ]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  });
        if(!queue) return message.channel.send({embeds: [
            new MessageEmbed()
            .setColor('EF4F4F')
            .setAuthor({name: `${nama}`, iconURL: `${icon}`})
            .setDescription('Tidak ada lagu yang diputar!')
			.setFooter(`${footer}`)
        ]})
        if(queue) {
            if(message.guild.me.voice.channelId !== message.member.voice.channelId) {
                return message.channel.send({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
					.setAuthor({name: `${nama}`, iconURL: `${icon}`})
                    .setDescription(`🚫 | Anda harus berada di voice channel yang sama dengan bot!`)
					.setFooter(`${footer}`)
                ]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
  });
            }
        }
        
        const song = queue.songs[0];
        const embed = new MessageEmbed()
        .setColor('#000008')
        .setAuthor({name: `${nama}`, iconURL: `${icon}`})
        .setDescription(`[${song.name}](${song.url})`)
        .setThumbnail(song.thumbnail)
		.setFooter(`${footer}`)
        .addField("🔷 | Status", `${status(queue).toString()}`, false)
        //.addField('👀 | Dilihat', `${Format.format(song.views)}`, false)
        //.addField('👍 | Suka', `${Format.format(song.likes)}`, false)
        //.addField('👎 | Tidak Suka', `${Format.format(song.dislikes)}`, false)
        .addField('⌛ | Durasi', `${queue.formattedCurrentTime} / ${song.formattedDuration}`, true)
        .addField('📩 | Download Link', `[Klik untuk download](${song.streamURL})`, true)
		.addField("👌 | Ditambahkan",` ${song.user}`, true)
		.addField('📻 | Channel', `
        ┕🔊 | ${client.channels.cache.get(queue.voiceChannel.id)}
        ┕🪄 | ${queue.voiceChannel.bitrate / 1000}  kbps`, true)
        

        message.channel.send({embeds: [embed]}).then(msg => {
    setTimeout(() => msg.delete(), 30000)
  });
    }
}
