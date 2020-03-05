const getSeasonOptions = require('../Options/seasonOptions');
const getModeOptions = require('../Options/modeOptions');
const getMapOptions = require('../Options/mapOptions');
const { getPbCache } = require('../Util/pbCache');

module.exports = handleWr;

let isPbing = false;

async function handleWr (message) {
    if (isPbing) return;
    isPbing = true;

    message.react('💬');
    const botMsg = await message.channel.send('💬 Searching personal Best, please hold on.');
    try {
        const messageVals = await message.replace('!wr ', '').split(',').map(i => i.trim());
        if (messageVals.length !== 3) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ To many or not enough parameters! Type \'!help wr\' for an overview of the required parameters.');
            isPbing = false;
            return;
        }
        const season = getSeasonOptions(messageVals[0]);
        if (!season) {
            await message.clearReactions();
            Message.react('❌');
            botMsg.edit('❌ No season found for \'' + messageVals[0] + '\'.');
            isPbing = false;
            return;
        }
        const mode = getModeOptions(messageVals[1]);
        if (!mode) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No mode found for \'' + messageVals[1] + '\'.');
            isPbing = false;
            return;
        }
        const user = message.author.tag;
        const opts = await getMapOptions(messageVals[2]);
        if (!opts.length) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No map found for \'' + messageVals[2] + '\'.');
            isPbing = false;
            return;
        } else {
            if (opts.length === 1) {
                map = opts[0];
            } else {
                const map = await getUserReaction(message, botMsg, opts);
                if (!map || !map.first()) {
                    await message.clearReactions();
                    message.react('⌛');
                    botMsg.edit('⌛ Timeout while selecting map! No Personal Best requested.');
                    isPbing = false;
                    return;
                }
            }
        }
        const cache = await getPbCache();
        if (!cache[season][mode][map]) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No Personal Best found for \''+season+' '+mode+' '+map+'\'. Go and set a time!');
            isPbing = false;
            return;
        }
        if (!cache[season][mode][map][user]) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No Personal Best found for \''+season+' '+mode+' '+map+'\'. Go and set a time!');
            isPbing = false;
            return;
        }
        const pb = cache[season][mode][map][user];
        message.clearReactions();
        message.react('✅');
        botMsg.edit('✅ Personal Best found!');

        message.channel.send('Personal Best!', {
            embed: {
                title: `Personal Best for ${pb.user}`,
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
                    value: `${season}`,
                    inline: true,
                },
                {
                    name: 'Mode',
                    value: `${mode}`,
                    inline: true,
                },
                {
                    name: 'Map',
                    value: `${map}`,
                    inline: true,
                },
                {
                    name: 'User',
                    value: `${pb.user}`,
                    inline: true,
                },
                {
                    name: 'Time',
                    value: `${pb.time}`,
                    inline: true,
                },
                {
                    name: 'Date',
                    value: `${pb.date}`,
                    inline: true,
                },],
                timestamp: new Date(),
                footer: {
                    icon_ulr: '',
                    text: 'PB requested',
                },
            },
        });
        channel.send(`${pb.link}`);
        isPbing = false;

    } catch (err) {
        isPbing = false;
        message.clearReactions();
        message.react('❌');
        botMsg.edit('❌ An error occurred while handling your submission. Informing staff.');
        console.log('Error in handleWr: ' + err);
    }
}