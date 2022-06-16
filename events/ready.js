const client = require("../index");

client.on("ready", () => {
    console.log("\x1b[34m%s\x1b[0m", `${client.user.tag} Online!`)
    const statuses = [ // status bot
        "Kiryuu ID",
        `${client.guilds.cache.size} Server`,
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Reader`,
        "k1 / Slash command"
    ]
    let index = 0
    setInterval(() => {
        if (index === statuses.length) index = 0
        const status = statuses[index]
        client.user.setActivity(`${status}`, {
            type: "LISTENING",
            browser: "DISCORD IOS"
        })
        index++
    }, 7000)
})
