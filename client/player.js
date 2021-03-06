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
โditambahkan oleh ${song.user.tag}.`)
      //.setThumbnail(song.thumbnail)
	  .setFooter(`${footer}`)
      //.addField("๐ท | Status", `
      //โ${status(queue).toString()}`, false)
        //.addField('๐ | Dilihat', `
        //โ${Format.format(song.views)}`, false)
        //.addField('๐ | Disukai', `
        //โ${Format.format(song.likes)}`, false)
        //.addField('๐ | Tidak Suka', `
        //โ${Format.format(song.dislikes)}`, false)
        //.addField('โ | Durasi', `
        //โ${song.formattedDuration}`, true)
        //.addField("๐ | Ditambahkan",`
        //โ${song.user}`, true)
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
        //.addField("๐ท | Status", `
        //โ${status(queue).toString()}`, false)
        //.addField('โ | Durasi', `
        //โ${playlist.formattedDuration}`, true)
        //.addField("๐ | Ditambahkan",`
        //โ${playlist.user}`, true)
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
โ${status(queue).toString()}`)
        //.setThumbnail(song.thumbnail)
		.setFooter(`${footer}`)
        //.addField("๐ท | Status", `
        //โ${status(queue).toString()}`, false)
        //.addField('๐ | Diupload', `
        //โ[${song.uploader.name}](${song.uploader.url})`, false)
        //.addField('๐ | Dilihat', `
        //โ${Format.format(song.views)}`, false)
        //.addField('๐ | Disukai', `
        //โ${Format.format(song.likes)}`, false)
        //.addField('โ | Durasi', `
        //โ${song.formattedDuration}`, true)
        //.addField('๐ฉ | Link Download', `
        //โ[Klik untuk Download](${song.streamURL})`, false)
        //.addField("๐ | Ditambahkan",`
        //โ${song.user}`, true)
        //.addField('๐ป | Channel', `
        //โ๐ | ${client.channels.cache.get(queue.voiceChannel.id)}
        //โ๐ช | ${queue.voiceChannel.bitrate / 1000}  kbps`, true)
        //.addField("๐ค | ฤแป xuแบฅt",`[${song.related[0].name}](${song.related[0].url})
        //โโ | Thแปi gian: ${song.related[0].formattedDuration} | ๐ | ฤฤng tแบฃi lรชn bแปi: [${song.related[0].uploader.name}](${song.related[0].uploader.url})`, false)
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

