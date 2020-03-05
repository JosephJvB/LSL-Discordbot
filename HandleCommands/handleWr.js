const getSeasonOptions = require('../Options/seasonOptions');
const getModeOptions = require('../Options/modeOptions');
const getMapOptions = require('../Options/mapOptions');
const { getWrCache } = require('../Util/wrCache');

module.exports = handleWr;

let isWring = false;

async function handleWr (message) {
    if (isWring) return;
    isWring = true;
    
    message.react('💬');
    const botMsg = await message.channel.send('💬 Searching World Record, please hold on.');
    try {
        const messageVals = await message.replace('!wr ', '').split(',').map(i => i.trim());
        if (messageVals.length !== 3) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ To many or not enough parameters! Type \'!help wr\' for an overview of the required parameters.');
            isWring = false;
            return;
        }
        const season = getSeasonOptions(messageVals[0]);
        if (!season) {
            await message.clearReactions();
            Message.react('❌');
            botMsg.edit('❌ No season found for \'' + messageVals[0] + '\'.');
            isWring = false;
            return;
        }
        const mode = getModeOptions(messageVals[1]);
        if (!mode) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No mode found for \'' + messageVals[1] + '\'.');
            isWring = false;
            return;
        }
        const opts = await getMapOptions(messageVals[2]);
        if (!opts.length) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No map found for \'' + messageVals[2] + '\'.');
            isWring = false;
            return;
        } else {
            if (opts.length === 1) {
                map = opts[0];
            } else {
                const map = await getUserReaction(message, botMsg, opts);
                if (!map || !map.first()) {
                    await message.clearReactions();
                    message.react('⌛');
                    botMsg.edit('⌛ Timeout while selecting map! No World Record requested.');
                    isWring = false;
                    return;
                }
            }
        }
        const cache = await getWrCache();
        if (!cache[season][mode][map]) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No Word Record found for \''+season+' '+mode+' '+map+'\'. Go and set a record!');
            isWring = false;
            return;
        }
        const wr = cache[season][mode][map];
        await message.clearReactions();
        message.react('✅');
        botMsg.edit('✅ World Record found!');

        message.channel.send('World Record!', {
            embed: {
                title: `World Record by ${wr.user}`,
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
                    value: `${wr.user}`,
                    inline: true,
                },
                {
                    name: 'Time',
                    value: `${wr.time}`,
                    inline: true,
                },
                {
                    name: 'Date',
                    value: `${wr.date}`,
                    inline: true,
                },],
                timestamp: new Date(),
                footer: {
                    icon_ulr: '',
                    text: 'PB requested',
                },
            },
        });
        channel.send(`${wr.link}`);
        isWring = false;

    } catch (err) {
        isWring = false;
        await message.clearReactions();
        message.react('❌');
        botMsg.edit('❌ An error occurred while handling your submission. Informing staff.');
        console.log('Error in handleWr: ' + err);
    }
}