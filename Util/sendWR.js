const getUser = require('./getUser');

module.exports = sendWr;

async function sendWr(discord, data) {
    const user = await getUser(discord, data.user);
    const oldUser = await getUser(discord, data.oldUser);
    const guild = await discord.guilds.get(process.env.DiscordGUILD);
    const channel = await guild.channels.get(process.env.wrCHANNEL);
    const oldDateArray = data.oldDate.split('/');
    const oldDate = new Date(oldDateArray[2], oldDateArray[1]-1, oldDateArray[0]);
    const dateArray = data.date.split('/');
    const date = new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
    const msDay = 1000*60*60*24;
    channel.send(`New WORLD RECORD! ${user}`, {
        embed: {
            title: `Record submitted by ${data.user}`,
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
            description: `Season:  ${data.season}\nMode:   ${data.mode}\nMap:    ${data.map}`,
            fields: [
                {
                    name: '__New Record__',
                    value: `User:\t${data.user}\nTime:\t${data.time}\nDate:\t${data.date}`,
                    inline: true,
                },
                {
                    name: '__Old Record__',
                    value: `User:\t${data.oldUser}\nTime:\t${data.oldTime}\nDate:\t${data.oldDate}`,
                    inline: true,
                },
                {
                    name: '__Comparison__',
                    value: `Time save:    ${Number(data.oldtime) - Number(data.time)}\nRecord held:  ${Math.round((date-oldDate)/msDay)}`,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Record posted',
                icon_url: '',
            },
        },
    });
    channel.send(`${d.user !== d.oldUser && d.oldUser !== 'None' ? getBM(oldUser) : null}\n ${data.link}`);
}

function getBM(user) {
    const bm = [
        'is not gonna like that!',
        'is all washed up!',
        'is still a pretty good surfer, I guess.',
        'you\'re too slow!',
        'it\'s time for a comeback!',
        'get it back, if you can.',
        'had a good run.',
        'stop sandbagging!'
    ];
    const msg = Math.round(Math.random()*bm.length-1);
    return `${user} ${smg}`
}