const { google } = require('googleapis');
const axios = require('axios');

const getUserReaction = require('../Util/UserReaction');
const getSeasonOptions = require('../Options/seasonOptions');
const getModeOptions = require('../Options/modeOptions');
const getMapOptions = require('../Options/mapOptions');

module.exports = handleSubmit;

let isSubmitting = false;

async function handleSubmit(message) { 
    if(isSubmitting) return;
    isSubmitting = true;

    message.react('💬');
    const botMsg = message.channel.send('💬 Processing submission. Please hold on.');
    try {
        const messageVals = message.replace('!submit ', '').split(',').map(i => i.trim());
        if (messageVals.length !== 5) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ To many or no enough Parameters! Type \'!help submit\' for an overview of the required parameters.');
            isSubmitting = false;
            return;
        }
        const season = await getSeasonOptions(messageVals[0]);
        if (season === undefined) {
            if(message.reactions.get('💬')) message.reactions.get('💬').remove();
            message.react('❌');
            botMsg.edit('❌ No season found for \'' + messageVals[0] + '\'.');
            isSubmitting = false;
            return;
        }
        const mode = await getModeOptions(messageVals[1]);
        if (mode === undefined) {
            if(message.reactions.get('💬')) message.reactions.get('💬').remove();
            message.react('❌');
            botMsg.edit('❌ No mode found for \'' + messageVals[1] + '\'.');
            isSubmitting = false;
            return;
        }
        const time = await isTime(messageVals[3]);
        if (time === undefined) {
            if(message.reactions.get('💬')) message.reactions.get('💬').remove();
            message.react('❌');
            botMsg.edit('❌ Incorrect time format \'' + messageVals[3] + '\'. Time must be split by decimal point (.)');
            isSubmitting = false;
            return;
        }
        const link = messageVals[4];
        const opts = await getMapOptions(messageVals[2]);
        if (!opts.length) {
            if(message.reactions.get('💬')) message.reactions.get('💬').remove();
            message.react('❌');
            botMsg.edit('❌ No map found for \'' + messageVals[2] + '\'.');
            isSubmitting = false;
            return;
        } else {
            if (opts.length === 1) {
                map = opts[0];
            } else {
                const map = await getUserReaction(message, botMsg, opts);
                if (!map || !map.first()) {
                    if(message.reactions.get('💬')) message.reactions.get('💬').remove();
                    message.react('⌛');
                    botMsg.edit('⌛ Timeout while selecting map! No run submitted.');
                    isSubmitting = false;
                    return;
                }
            }
        }
        const submitUrl = await getSubmitUrl(messsage, season, mode, map, time, link);
        resp = await axios.post(submitUrl);

        if (Resp.status === 200) {
            await message.clearReactions();
            message.react('✅');
            botMsg.edit(`✅ New run submitted by ${message.author}`);
        } else {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ Not able to submit your run. Please try again.');
        }
        isSubmitting = false;
    } catch (err) {
        isSubmitting = false;
        await message.clearReactions();
        message.react('❌');
        botMsg.edit('❌ An error occurred while handling your submission. Informing staff.');
        console.log('Error in handleSubmission: ' + err);
    }
}

function getSubmitUrl(message, season, mode, map, time, link) {
    const submiturl = '';
    switch (season) {
        case '1': 
            submiturl+=`${process.env.gFormS1}`;
            break;
        case '2':
            submiturl+=`${process.env.gFormS2}`;
            break;
        case '3':
            submiturl+=`${process.env.gFormS3}`;
            break;
    }
    submiturl+=`&${process.env.gFormMODE}=${mode}`;
    submiturl+=`&${process.env.gFormMAP}=${map}`;
    submiturl+=`&${process.env.gFormTIME}=${time}`;
    submiturl+=`&${process.env.gFormLINK}=${link}`;
    submiturl+=`&${process.env.gFormUSER}=${message.author.tag}`;
    return submiturl;
}

function isTime(time) {
    a = time.split('.');
    if (!a[1]) return;
    if (a[1].length !== 2) return;
    return time;
}
