const { google } = require('googleapis');

module.exports = { getWrCache, setWrCache, updateWrCache };

let cache;
// structure [season][mode][map]
function getWrCache() {
    return cache;
}

async function setWrCache(auth) {
    const token = await getGoogleAuth();
    const sheets = google.sheets('v4');
    const struc = {
        season1: {
            Gravspeed: {},
            Standard: {}
        },
        season2: {
            Gravspeed: {},
            Standard: {}
        },
        season3: {
            Gravspeed: {},
            Standard: {}
        }
    };
    const gravs1 = struc.season1.Gravspeed;
    const stans1 = struc.season1.Standard;
    const gravs2 = struc.season2.Gravspeed;
    const stans2 = struc.season2.Standard;
    const gravs3 = struc.season3.Gravspeed;
    const stans3 = struc.season3.Standard;
    try {
        const response1 = (await sheets.spreadsheets.values.get({
            auth: token,
            spreadsheetId: process.env.gSheetS1,
            range: 'Leaderboards!A7:K'
        })).data;
        const rows1 = await response1.values;
        const response2 = (await sheets.spreadsheets.values.get({
            auth: token,
            spreadsheetId: process.env.gSheetS2,
            range: 'Leaderboards!A7:K'
        })).data;
        const rows2 = await response2.values;
        const response3 = (await sheets.spreadsheets.values.get({
            auth: token,
            spreadsheetId: process.env.gSheetS3,
            range: 'Leaderboards!A7:K'
        })).data;
        const rows3 = await response3.values;
        for (i=0; i < rows1.length; i++) {
            const row = rows1[i];
            if (row[1] !== '0.00') {
                if (!gravs1[row[0]]) gravs1[row[0]] = {};
                gravs1[row[0]].user = row[2];
                gravs1[row[0]].time = Number(row[1]);
                gravs1[row[0]].link = row[3];
                gravs1[row[0]].date = row[4];
            }
            if (row[7] !== '0.00') {
                if (!stans1[row[6]]) stans1[row[6]] = {};
                stans1[row[6]].user = row[8];
                stans1[row[6]].time = Number(row[7]);
                stans1[row[6]].link = row[9];
                stans1[row[6]].date = row[10];
            }
        }
        for (i=0; i < rows2.length; i++) {
            const row = rows2[i];
            if (row[1] !== '0.00') {
                if (!gravs2[row[0]]) gravs2[row[0]] = {};
                gravs2[row[0]].user = row[2];
                gravs2[row[0]].time = Number(row[1]);
                gravs2[row[0]].link = row[3];
                gravs2[row[0]].date = row[4];
            }
            if (row[7] !== '0.00') {
                if (!stans2[row[6]]) stans2[row[6]] = {};
                stans2[row[6]].user = row[8];
                stans2[row[6]].time = Number(row[7]);
                stans2[row[6]].link = row[9];
                stans2[row[6]].date = row[10];
            }
        }
        for (i=0; i < rows1.length; i++) {
            const row = rows3[i];
            if (row[1] !== '0.00') {
                if (!gravs3[row[0]]) gravs3[row[0]] = {};
                gravs3[row[0]].user = row[2];
                gravs3[row[0]].time = Number(row[1]);
                gravs3[row[0]].link = row[3];
                gravs3[row[0]].date = row[4];
            }
            if (row[7] !== '0.00') {
                if (!stans3[row[6]]) stans3[row[6]] = {};
                stans3[row[6]].user = row[8];
                stans3[row[6]].time = Number(row[7]);
                stans3[row[6]].link = row[9];
                stans3[row[6]].date = row[10];
            }
        }
        cache = await struc;
    } catch (err) {
        console.log('An error occurred in wrCache[setWrCache]: ' + err);
    }
}

function updateWrCache(data) {
    map = cache[data.season][data.mode][data.map];
    if (!map) map = {};
    map.user = data.user;
    map.time = data.time;
    map.link = data.link;
    const date = new Date();
    const day = `${date.getDate}/${date.getMonth}/${date.getFullYear}`;
    map.date = day;
}