const { getGoogleAuth } = require('../google-auth'); 
const { google } = require('googleapis');
const getUser = require('./getUser');

module.exports = roleUpdate;

let roleArray = ['Surfer', 'Super Surfer', 'Epic Surfer', 'Legendary Surfer', 'Mythic Surfer'];

async function roleUpdate(discord) {
    try {
        const guild = await discord.guilds.get(process.env.discordGUILD);
        const rolesAll = await guild.roles.fetch();
        const roles = await rolesAll.filter(r => roleArray.includes(r.name));
        var users = {};
        const token = await getGoogleAuth;
        const sheet = google.sheets('v4');
        const data = (await sheet.spreadsheets.values.get({
            auth: token,
            spreadsheetId: process.env.gSheetS3,
            range: 'PointSheet!A3:E'
        })).data;
        const rows = await data.values;
        for (i=0;i<rows.length;i++) {
            const row = rows[i];
            if (row[1]) {
                if (!users[row[1]]) user[row[1]] = {};
                if (!users[row[1]].points) user[row[1]].points = row[0];
                if (users[row[1]].points < row[0]) users[row[1]].points = row[0];
            }
            if (row[4]) {
                if (!users[row[4]]) user[row[4]] = {};
                if (!users[row[4]].points) user[row[4]].points = row[3];
                if (users[row[4]].points < row[3]) users[row[4]].points = row[3];
            }
        }
        for (property in users) {
            const user = await getUser(discord, String(property));
            if (!user.name) continue;
            const roleStr = await getNewRole(Number(users[property].points));
            if (!roleStr) {
                const userRole = await getCurRole(roles, user);
                user.roles.remove(userRole);
                continue;
            }
            if (user.roles.find(r => r.name === roleStr)) continue;
            var CurRole = getCurRole(roles, user);
            await user.roles.remove(CurRole);
            var NewRole = roles.find(r => r.name === roleStr);
            await user.roles.add(NewRole);
        }
    } catch (error) {
        console.log('An error occured in roleUpdate: '+error);
    }
}

function getNewRole(points) {
    if (points < 300) return;
    if (points < 1000) return 'Surfer';
    if (points < 2000) return 'Super Surfer';
    if (points < 4000) return 'Epic Surfer';
    if (points < 5500) return 'Lengedary Surfer';
    return 'Mythic Surfer';
}

function getCurRole(roles, user) {
    return user.roles.filter(r => roles.includes(r));
}
