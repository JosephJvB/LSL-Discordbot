const { google } = require('googleapis');

const { getGoogleAuth } = require('../google-auth');
const getSeasonOptions = require('../Options/seasonOptions');

modules.exports = handleDelete;

let isDeleting = false;

async function handleDelete(message) {
    if (isDeleting) return;
    isDeleting = true;

    message.react('💬');
    const botMsg = await message.channel.send('💬 Processing deletion. Please hold on.');

    try {
        const messageVals = message.replace('!delete ', '').split(',').map(i => i.trim());
        if (messageVals.length !== 3) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ To many or not enough parameters! Type \'!help delete\' for an overview of the required parameters.');
            isDeleting = false;
            return;
        }
        const season = getSeasonOptions(messageVals[0]);
        if (season === undefined) {
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No season found for \'' + messageVals[0] + '\'.');
            isDeleting = false;
            return;
        }
        const id;
        if (season === '1') id = process.env.gSheetS1;
        else if (season === '2') id = process.env.gSheetS2;
        else if (season === '3') id = process.env.gSheetS3;
        sid = process.env.gSheetLOGID;
        const link = messageVals([1]);

        const row;
        token = await getGoogleAuth();
        client = google.sheets('v4');
        const deleteVals = await client.spreadsheets.values.get({
            auth: token,
            spreadsheetId: id,
            range: 'Record Log!B:F',
            majorDimension: 'COLUMNS'
        }, (res) => {
            const cols = res.data.values;
            if (cols[2].includes(link)) {
                row = cols[2].indexof(link);
                if (cols[0][row] === message.author.tag || message.member.roles.has('574732901208424449') || message.member.roles.has('574523898784251908')) {
                    return [cols[0][row], cols[1][row], cols[2][row], cols[3][row], cols[4][row]];
                }
            }
            await message.clearReactions();
            message.react('❌');
            botMsg.edit('❌ No run found belonging to ' + message.author + ' for \'' + link + '\'.');
            isDeleting = false;
            return;
        });
        if (!deleteVals) {
            isDeleting = false;
            return;
        }
        let requests = [];
        requests.push({
            deleteDimension: {
                range: {
                    sheetId: parseInt(sid),
                    dimension: 'ROWS',
                    startIndex: row,
                    endIndex: row + 1,
                },
            },
        });
        requests.push({
            appendDimension: {
                sheetId: parseInt(sid),
                dimension: 'ROWS',
                length: 1,
            },
        })
        const resourceVals = {requests};
        await client.spreadsheets.batchUpdate({
            auth: token,
            spreadsheetId: id,
            resource: resourceVals,
        }, (res) => {
            await message.clearReactions();
            message.react('✅');
            botMsg.edit('✅ Sucessfully deleted run!');
        });
        isDeleting = false;
    } catch (err) {
        isDeleting = false;
        await message.clearReactions();
        message.react('❌');
        botMsg.edit('❌ An error occurred while handling your deletion. Informing staff.');
        console.log('Error in handleDeletion: ' + err);
    }
}