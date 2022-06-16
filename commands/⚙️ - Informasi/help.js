const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags')

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: '⚙️ - Informasi',
    usage: 'emi help [Command]',
    description: 'Petunjuk untuk menggunakan perintah',

    async run (client, message, args) {
        if (!args[0]) return getAll(client, message);
        return getCMD(client, message, args[0]);
    },
};

function getAll (client, message) {
    const embed = new MessageEmbed()
    .setColor('#000008')
    .setTitle(`📫 | Daftar Command ${client.user.username}`)
    //.setFooter(`Coded by: Aesir#4444  |  Gunakan k2!help [command] untuk lebih jelasnya!`)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(' | ')
    }

    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    embed.setDescription(info);
    return message.channel.send({embeds: [embed]});
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())))

    if (cmd.name) info = `**Nama Command:** ${cmd.name}`
    if (cmd.aliases) info += `\n**Alias:** ${cmd.aliases.map(a => `\`${a}\``).join(',')}`
    if (cmd.description) info += `\n**Deskripsi:** ${cmd.description}`
    if (cmd.usage) {
        info += `\n**Cara menggunakan Command:** ${cmd.usage}`;
        embed.setFooter("Syntax <> = Diperlukan, [] = Opsional")
    }
    return message.channel.send({embeds: [embed.setColor('GREEN').setDescription(info)]})
}
