const { DisTube } = require('distube');
const client = require("../index.js");
const { MessageEmbed } = require('discord.js');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YouTubeDLPlugin } = require("@distube/yt-dlp")
const { cookie } = require('../config.json');
const Format = Intl.NumberFormat();
const config = require('../config.json');
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: false
};


const nama = 'Chill Music'
const footer = 'Chill Vibes'
const icon = 'https://media.discordapp.net/attachments/967102733335265310/967103637753049088/e8c00e3b01aad72fa87271aa95816689.jpg'

client.distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  youtubeCookie: `${cookie}`,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()
  ]
})
if(config.spotifyapi.enabled) {
  spotifyoptions.api = {
    clientId: config.spotifyapi.clientId,
    clientSecret: config.spotifyapi.clientSecret,
  }}

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Queue' : 'Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube.on('addSong', (queue, song) =>
  queue.textChannel.send({embeds: [
      new MessageEmbed()
      .setColor('#000008')
      .setAuthor({name: `${nama}`, iconURL: `${icon}`})
      .setDescription(`[${song.name}](${song.url}) - [${song.formattedDuration}] 
┕ditambahkan oleh ${song.user.tag}.`)
      //.setThumbnail(song.thumbnail)
	  .setFooter(`${footer}`)
      //.addField("🔷 | Status", `
      //┕${status(queue).toString()}`, false)
        //.addField('👀 | Dilihat', `
        //┕${Format.format(song.views)}`, false)
        //.addField('👍 | Disukai', `
        //┕${Format.format(song.likes)}`, false)
        //.addField('👎 | Tidak Suka', `
        //┕${Format.format(song.dislikes)}`, false)
        //.addField('⌛ | Durasi', `
        //┕${song.formattedDuration}`, true)
        //.addField("👌 | Ditambahkan",`
        //┕${song.user}`, true)
  ]}) .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
)

client.distube.on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds: [
        new MessageEmbed()
        .setColor('#000008')
        .setAuthor({name: `${nama}`, iconURL: `${icon}`})
        .setDescription(`[${playlist.name}](${playlist.url}) (${playlist.songs.length} Lagu) berhasil ditambah ke daftar putar.`)
        //.setThumbnail(playlist.thumbnail)
		.setFooter(`${footer}`)
        //.addField("🔷 | Status", `
        //┕${status(queue).toString()}`, false)
        //.addField('⌛ | Durasi', `
        //┕${playlist.formattedDuration}`, true)
        //.addField("👌 | Ditambahkan",`
        //┕${playlist.user}`, true)
    ]}) .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
)

client.distube.on('playSong', (queue, song) =>
    queue.textChannel.send({embeds: [
        new MessageEmbed()
        .setColor('#000008')
        //.setAuthor({name: `${song.name}(${song.url})`, iconURL: 'https://cdn.discordapp.com/icons/982130346860638258/bfcc48ce48ff1d32ca87e607d9e7e840.png'})
        //.setDescription(`[${song.name}](${song.url})`)
        //.setThumbnail(song.thumbnail)
        .setColor('#000008')
        .setAuthor({name: `${nama}`, iconURL: `${icon}`})
        .setDescription(`[${song.name}](${song.url}) - [${song.formattedDuration}]
┕${status(queue).toString()}`)
        //.setThumbnail(song.thumbnail)
		.setFooter(`${footer}`)
        //.addField("🔷 | Status", `
        //┕${status(queue).toString()}`, false)
        //.addField('🆙 | Diupload', `
        //┕[${song.uploader.name}](${song.uploader.url})`, false)
        //.addField('👀 | Dilihat', `
        //┕${Format.format(song.views)}`, false)
        //.addField('👍 | Disukai', `
        //┕${Format.format(song.likes)}`, false)
        //.addField('⌛ | Durasi', `
        //┕${song.formattedDuration}`, true)
        //.addField('📩 | Link Download', `
        //┕[Klik untuk Download](${song.streamURL})`, false)
        //.addField("👌 | Ditambahkan",`
        //┕${song.user}`, true)
        //.addField('📻 | Channel', `
        //┕🔊 | ${client.channels.cache.get(queue.voiceChannel.id)}
        //┕🪄 | ${queue.voiceChannel.bitrate / 1000}  kbps`, true)
        //.addField("🤖 | Đề xuất",`[${song.related[0].name}](${song.related[0].url})
        //┕⌛ | Thời gian: ${song.related[0].formattedDuration} | 🆙 | Đăng tải lên bởi: [${song.related[0].uploader.name}](${song.related[0].uploader.url})`, false)
    ]}) .then(msg => {
    setTimeout(() => msg.delete(), 180000)
  })
  )
  
  .on('error', (channel, e) => {
    channel.send(`| Terjadi kesalahan: ${e.toString().slice(0, 1974)}`) .then(msg => {
    setTimeout(() => msg.delete(), 25000)
  })
    console.error(e)
  })
  
  .on('empty', channel => channel.send({embeds: [
      new MessageEmbed()
      .setColor('#00008')
      .setAuthor({name: `${nama}`, iconURL: `${icon}`})
      .setDescription('Daftar putar kosong.')
	  .setFooter(`${footer}`)
    ]}) .then(msg => {
    setTimeout(() => msg.delete(), 120000)
  })
     )
  
  .on('searchNoResult', (message, query) =>
    message.channel.send({embeds: [
        new MessageEmbed()
        .setColor('#000008')
        .setAuthor({name: `${nama}`, iconURL: `${icon}`})
        .setDescription(`Tidak ada lagu yang ditemukan dengan kata kunci \`${query}\``)
		.setFooter(`${footer}`)
    ]}) .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  })
  )
  
  .on('finish', queue => queue.textChannel.send({embeds: [
      new MessageEmbed()
      .setColor('#000008')
      .setAuthor({name: `${nama}`, iconURL: `${icon}`})
      .setDescription('Daftar putar kosong.')
	  .setFooter(`${footer}`)
    ]})/*.then(msg => {
    setTimeout(() => msg.delete(), 120000)
  })*/
  )

