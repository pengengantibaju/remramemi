const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: "eval",
    aliases: ["ev", "e"],
    category: "🦉 - Owner",
    description: "Terapkan sepotong kode Anda",
    usage: "eval <code>",
    run: async (client, message, args) => {
        if(message.author.id != '570589477920309259') {
            return message.reply({embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription('🚫 | Hanya Nanda#1234 yang bisa menggunakan command ini!')
            ]})
        };

        const code = args.join(" ");
        const start = process.hrtime();
        const difference = process.hrtime(start);
        if(!code) return message.reply({embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription('🚫 | Anda belum memasukkan kode!')
        ]});

        if (message.author.id == '570589477920309259') {
            try {
                const result = await eval(code);
                let output = result;
//                 if(typeof result !== "string") {
//                     output = inspect(result);
//                 }

                const embed = new MessageEmbed()
                .setColor('#ccff48')
                .setAuthor({name: '🦉 - Eval', iconURL: message.author.avatarURL()})
                .addField('**Input**', `\`\`\`js\n${code}\`\`\``, false)
                .addField('**Output**', `\`\`\`js\n${output}\`\`\``, false)
                .addField('**Tipe Data**', `\`\`\`js\n${typeof result}\`\`\``, false)
                .addField('**Perintah dijalankan di**', `\`\`\`diff\n${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms\`\`\``, false)

                message.reply({embeds: [embed]})
            } catch (e) {
                console.log(e);
                return message.reply({embeds: [
                    new MessageEmbed()
                    .setColor('RED')
                    .setDescription('Kesalahan: ' + e)
                ]})
            }
        }
    }
}
