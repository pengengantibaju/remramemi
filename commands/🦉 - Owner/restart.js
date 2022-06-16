const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restarts the bot',
    category: '🦉 - Owner',
    usage: 'restart',
    aliases: ['rb'],

    run: async (client, message, args) => {
        if(message.author.id != '570589477920309259') {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('#ff0000')
                .setDescription('Hanya Nanda#1234 yang bisa menggunakan command ini!')
            ]})
        } else {
            const embed = new MessageEmbed()
            .setColor('#ccff48')
            .setAuthor({name: 'Reboot', iconURL: 'https://cdn.discordapp.com/icons/944440125327298610/a_9cafd6627815a54b022594fde169f8c4.gif?'})
            .setDescription(` \`\`\`md\n#Memulai ulang ${client.user.tag}...\nProses ini akan memakan waktu sekitar 1 menit\`\`\``)
            message.reply({embeds: [embed]})
            try {
                process.exit()
            } catch (e) {
                console.log(e)
                message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('#ff0000')
                    .setDescription(`Kesalahan! Terjadi kesalahan. Coba lagi nanti ${e}!`)
                ]})
            }
        }
    }
}