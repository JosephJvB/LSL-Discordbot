const getUser = require('./getUser');

module.exports = sendSubmit;

async function sendSubmit(discord, data) {
    const user = await getUser(discord, data.user);
    const guild = await discord.guilds.get(process.env.DiscordGUILD);
    const channel = await guild.channels.get(process.env.submitCHANNEL);
    channel.send(`new run submitted! ${user}`, {
        embed: {
            title: `new run submitted by ${data.user}`,
            url: '',
            color: 3010349,
            author: {
                name: 'LSL-discordbot',
                icon_ulr: '',
                url: '',
            },
            thumbnail: {
                url: '',
            },
            fields: [{
                name: 'Season',
                value: `${data.season}`,
                inline: true,
            },
            {
                name: 'Mode',
                value: `${data.mode}`,
                inline: true,
            },
            {
                name: 'Map',
                value: `${data.map}`,
                inline: true,
            },
            {
                name: 'User',
                value: `${data.user}`,
                inline: true,
            },
            {
                name: 'Time',
                value: `${data.time}`,
                inline: true,
            },
            {
                name: 'Date',
                value: `${data.date}`,
                inline: true,
            },],
            timestamp: new Date(),
            footer: {
                icon_ulr: '',
                text: 'Run posted',
            },
        },
    });
    channel.send(`${data.link}`);
}
