const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'server-leave',
  aliases: ['svlv'],
  category: '🦉 - Owner',
  description: 'Leave the server',
  usage: 'server-leave',
  run: async (client, message, args) => {
    if (message.author.id != '570589477920309259')
      return message.reply('Hanya Nanda#1234 yang bisa menggunakan command ini!');
    const guild = client.guilds.cache.get(args.join(' '));
    try {
      if (!guild)
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setDescription(`🚫 | Server tidak ditemukan!`),
          ],
        });
      await guild.leave();
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor('#ccff48')
            .setDescription(
              `✅ | Bot telah keluar dari server ${guild.name} - ${guild.id} - ${guild.memberCount} member!`
            ),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
